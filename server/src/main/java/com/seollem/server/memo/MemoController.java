package com.seollem.server.memo;

import com.seollem.server.book.entity.Book;
import com.seollem.server.book.service.BookService;
import com.seollem.server.member.entity.Member;
import com.seollem.server.member.service.MemberService;
import com.seollem.server.util.GetEmailFromHeaderTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/memos")
@Slf4j
@Validated
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;
    private final  MemoMapper mapper;
    private final MemberService memberService;

    private final GetEmailFromHeaderTokenUtil getEmailFromHeaderTokenUtil;
    private final BookService bookService;

//    @PostMapping
//    public ResponseEntity postMemo(@RequestHeader Map<String, Object> requestHeader,
//                                   @Valid @RequestBody MemoDto.Post post) {
//        String email = getEmailFromHeaderTokenUtil.getEmailFromHeaderToken(requestHeader);
//        Member member = memberService.findVerifiedMemberByEmail(email);
//        Memo memoOfBook = mapper.memoPostToMemo(post);
//        Memo memo = memoService.createMemo(memoOfBook);
//        memo.setMember(member);
//        MemoDto.Response response = mapper.memoToMemoResponse(memo);
//        Book book = memo.getBook();
//
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }
@PostMapping("/{book-id}")
public ResponseEntity postMemo(@RequestHeader Map<String, Object> requestHeader,
                               @Valid @RequestBody MemoDto.Post post,
                               @Positive @PathVariable("book-id") long bookId) {
    String email = getEmailFromHeaderTokenUtil.getEmailFromHeaderToken(requestHeader);
    Member member = memberService.findVerifiedMemberByEmail(email);

    Memo memoOfBook = mapper.memoPostToMemo(post);
    Book book = bookService.findVerifiedBookById(bookId);
    memoOfBook.setMember(member);
    memoOfBook.setBook(book);

    Memo memo = memoService.createMemo(memoOfBook);
    MemoDto.Response response = mapper.memoToMemoResponse(memo);

    return new ResponseEntity<>(response, HttpStatus.CREATED);
}

    @PatchMapping("/{book-id}/{memo-id}")
    public ResponseEntity patchMemo(@RequestHeader Map<String, Object> requestHeader,
                                    @Positive @PathVariable("book-id") long bookId,
                                    @PathVariable("memo-id")@Positive long memoId,
                                    @Valid @RequestBody MemoDto.Patch patch){
        String email = getEmailFromHeaderTokenUtil.getEmailFromHeaderToken(requestHeader);
        Member member = memberService.findVerifiedMemberByEmail(email);

        patch.setMemoId(memoId);
        Memo PatchMemo = mapper.memoPatchToMemo(patch);
        Book book = bookService.findVerifiedBookById(bookId);
        PatchMemo.setMember(member);
        PatchMemo.setBook(book);


        Memo memo = memoService.updateMemo(PatchMemo);
        MemoDto.Response response = mapper.memoToMemoResponse(memo);
        // patch.setMemoId(memoId);
        //        Memo memo = memoService.updateMemo(mapper.memoPatchToMemo(patch));
        //        MemoDto.Response response = mapper.memoToMemoResponse(memo);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/random")
    public ResponseEntity randomMemo(@RequestHeader Map<String, Object> requestHeader) {
        String email = getEmailFromHeaderTokenUtil.getEmailFromHeaderToken(requestHeader);
        Member member = memberService.findVerifiedMemberByEmail(email);

        List<Memo> random = memoService.randomMemo();
        List<MemoDto.RandomResponse> responses =
                random.stream()
                        .map(memo-> mapper.momoToMemoRandom(memo))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(responses,HttpStatus.OK);

    }

    @DeleteMapping("/{memo-id}")
    public ResponseEntity deleteMemo(@RequestHeader Map<String, Object> requestHeader,
                                     @PathVariable("memo-id")@Positive long memoId){
        String email = getEmailFromHeaderTokenUtil.getEmailFromHeaderToken(requestHeader);
        Member member = memberService.findVerifiedMemberByEmail(email);

        memoService.deleteMemo(memoId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
