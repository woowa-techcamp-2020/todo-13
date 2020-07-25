import App from '../../App';
import '@testing-library/jest-dom';
import {
    screen
} from '@testing-library/dom'

document.body.innerHTML = "<main id=\"App\" data-testid=\"App\"></main>"

describe("App component", () => {
    const app = new App(screen.getByTestId('App'));

    it("렌더링 된다", () => {
        expect(screen.getByTestId('App')).toBeEnabled();
        expect(screen.getByTestId('App').hasChildNodes).toBeTruthy();
    })
})