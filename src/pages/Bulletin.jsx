import Echo from '../components/Echo';

const echoData = [
  { x: 0.1, y: 50, message: 'Echo 1' },
  { x: 0.2, y: 100, message: 'Echo 2' },
  { x: 0.5, y: 150, message: 'Echo 3' },
  { x: 0.3, y: 1050, message: 'Bony' },
];


function Bulletin() {
  return (
    <div>
      <div className= "h-bulletin-height">
        {echoData.map((button, index) => (
          <Echo key={index} x={button.x} y={button.y} message={button.message} />
        ))}
      </div>
    </div>
  );
}

export default Bulletin;