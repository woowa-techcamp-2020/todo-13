import { makeElementWithClass } from "../../utils/util"

describe("makeElementWithClass", () => {
    //given
    describe("element 의 타입, 클래스 이름, 들어갈 내용을 문자열 형태의 인자로 받는다", () => {
        //when
        const elementType = "div";
        const className = "container"
        describe("내용 인자가 전달되지 않으면", () => {
            //then
            const config = {
                elementType,
                className
            }
            it("내용이 빈 element가 생성된다", () => {
                expect(makeElementWithClass(config).innerHTML).toEqual("");
            });
        });

        //when
        describe("내용 인자가 전달되면", () => {
            const content = "내용";
            //then
            const config = {
                elementType,
                className,
                content,
            }
            it("내용을 담은 element가 생성된다", () => {
                expect(makeElementWithClass(config).innerHTML).toEqual(content);
            });
        });
    });

})