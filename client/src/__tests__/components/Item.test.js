import Item from '../../components/Item';
import '@testing-library/jest-dom';
import {
    screen
} from '@testing-library/dom';

document.body.innerHTML = "<div data-testid=\"container\"></div>";
const item = {
    "username": "user1",
    "action": "move from 해야할 일 to 하는 중",
    "cardId": 3,
    "cardContent": "github 공부하기",
    "last_updated": "2020-07-15 16:20:20",
};

describe("Item component", () => {
    const $item = new Item(screen.getByTestId('container'), {
        item
    });

    it("렌더링 된다", () => {
        expect(screen.getByTestId('item')).toBeEnabled();
    })
})