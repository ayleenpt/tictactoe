import One from './assets/base/one.png';
import Two from './assets/base/two.png';
import Three from './assets/base/three.png';
import Four from './assets/base/four.png';
import Five from './assets/base/five.png';
import Six from './assets/base/six.png';
import Seven from './assets/base/seven.png';
import Eight from './assets/base/eight.png';
import Nine from './assets/base/nine.png';
import OneX from './assets/x/x_one.png';
import TwoX from './assets/x/x_two.png';
import ThreeX from './assets/x/x_three.png';
import FourX from './assets/x/x_four.png';
import FiveX from './assets/x/x_five.png';
import SixX from './assets/x/x_six.png';
import SevenX from './assets/x/x_seven.png';
import EightX from './assets/x/x_eight.png';
import NineX from './assets/x/x_nine.png';
import OneO from './assets/o/o_one.png';
import TwoO from './assets/o/o_two.png';
import ThreeO from './assets/o/o_three.png';
import FourO from './assets/o/o_four.png';
import FiveO from './assets/o/o_five.png';
import SixO from './assets/o/o_six.png';
import SevenO from './assets/o/o_seven.png';
import EightO from './assets/o/o_eight.png';
import NineO from './assets/o/o_nine.png';

const backgrounds = [
  One, Two, Three, Four, Five, Six, Seven, Eight, Nine
]

const Xs = [
  OneX, TwoX, ThreeX, FourX, FiveX, SixX, SevenX, EightX, NineX
]

const Os = [
  OneO, TwoO, ThreeO, FourO, FiveO, SixO, SevenO, EightO, NineO
]

function Square ({ index, value, onSquareClick }) {
  let background = backgrounds[index];
  if (value === "X") background = Xs[index];
  if (value === "O") background = Os[index];
  return (
    <div
      className={'square'}
      onClick={onSquareClick}
    >
      <img src={background} alt="glass" className="square-bg"/>
    </div>
  );
}

export default Square;