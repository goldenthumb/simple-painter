import Painter from './Painter';

describe('Painter', () => {
    test('create', () => {
        const canvas = document.createElement('canvas');
        const painter = new Painter({ canvas });
        expect(painter).toBeInstanceOf(Painter);
    });
});