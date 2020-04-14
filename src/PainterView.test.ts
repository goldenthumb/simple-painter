import PainterView from './PainterView';

describe('PainterView', () => {
    test('create', () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;    

        const painterView = new PainterView(canvas, ctx);
        expect(painterView).toBeInstanceOf(PainterView);
    });
});