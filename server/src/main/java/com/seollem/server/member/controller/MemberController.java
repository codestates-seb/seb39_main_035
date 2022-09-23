package com.seollem.server.member.controller;

import com.seollem.server.dto.SingleResponseDto;
import com.seollem.server.jwt.decoder.TokenDecodeService;
import com.seollem.server.member.dto.MemberDto;
import com.seollem.server.member.entity.Member;
import com.seollem.server.member.mapper.MemberMapper;
import com.seollem.server.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


@RestController
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberMapper memberMapper;
    private final MemberService memberService;
    private final TokenDecodeService tokenDecodeService;

    public MemberController(MemberMapper memberMapper, MemberService memberService, TokenDecodeService tokenDecodeService) {
        this.memberMapper = memberMapper;
        this.memberService = memberService;
        this.tokenDecodeService = tokenDecodeService;
    }

    @GetMapping(path = "/me")
    public ResponseEntity getMember(@RequestHeader Map<String, Object> requestHeader) {
        String email = getEmailFromHeaderToken(requestHeader);
        Member member = memberService.findVerifiedMemberByEmail(email);

        return new ResponseEntity<>(memberMapper.memberToMemberGetResponse(member), HttpStatus.OK);
    }

    @PatchMapping("/me")
    public ResponseEntity patchMember(@RequestHeader Map<String, Object> requestHeader,
                                      @Valid @RequestBody MemberDto.Patch requestBody){
        String email = getEmailFromHeaderToken(requestHeader);

        Member findMember = memberService.findVerifiedMemberByEmail(email);
        Member patchMember = memberMapper.memberPatchToMember(requestBody);

        patchMember.setEmail(findMember.getEmail());

        Member member = memberService.updateMember(patchMember);

        return new ResponseEntity<>(memberMapper.memberToMemberPatchResponse(member), HttpStatus.OK);
    }

    @DeleteMapping("/me")
    public ResponseEntity patchMember(@RequestHeader Map<String, Object> requestHeader) {
        String email = getEmailFromHeaderToken(requestHeader);

        memberService.deleteMember(email);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }


    public String getEmailFromHeaderToken(Map<String, Object> requestHeader){
        String token = requestHeader.get("authorization").toString();
        String email = tokenDecodeService.findEmail(token);

        return email;
    }

}