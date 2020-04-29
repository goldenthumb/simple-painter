import Painter from '../src';
import FreeLine from '../src/Figure/FreeLine';
import Rectangle from '../src/Figure/Rectangle';
import Ellipse from '../src/Figure/Ellipse';
import StraightLine from '../src/Figure/StraightLine';

const radios = document.getElementsByName('draw-type');
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const painter = (window as any).painter = new Painter({ canvas, width: 500, height: 500 });

for (const radio of radios) {
    radio.addEventListener('change', () => {
        painter.setOptions({type: (document.querySelector('input[name="draw-type"]:checked') as any).value});
    });
}

painter.draw(
    new FreeLine({
        color: 'red',
        thickness: 3,
        lineCap: 'round',
    }, [
        { x: 0.537866461275263, y: 0.24183928841850494 },
        { x: 0.655767612752637, y: 0.14106861275263723 },
        { x: 0.654859612752637, y: 0.14429961275263721 },
        { x: 0.652134612752637, y: 0.15560861275263723 },
        { x: 0.649416127526371, y: 0.16368561275263742 },
        { x: 0.643052612752637, y: 0.18630261275263712 },
        { x: 0.640327612752637, y: 0.19599561275263723 },
        { x: 0.638516127526372, y: 0.20245761275263723 },
    ])
);


painter.draw(
    new Rectangle({
        color: 'blue',
        thickness: 10,
        lineCap: 'round',
    }, { 
        x: 0.45800570994602724, 
        y: 0.29400569993626097 
    }, { 
        x: 0.6980057245944656, 
        y: 0.46000571006809754 
    })
);


painter.draw(
    new Ellipse({  
        color: 'green',
        thickness: 2,
        lineCap: 'round'
    },{ 
        x: 0.589660464410864, 
        y: 0.39722129782530574 
    },{
        x: 0.8147651703463574,
        y: 0.5984210792366761 
    })
);

painter.draw(
    new StraightLine({  
        color: 'purple',
        thickness: 5,
        lineCap: 'square',
    },{ 
        x: 0.589660464410864, 
        y: 0.39722129782530574
    },{
        x: 0.8147651703463574, 
        y: 0.5984210792366761 
    })
);


painter.on('drawEnd', (positions, event) => {
    console.log('drawEnd', positions, event);
});
