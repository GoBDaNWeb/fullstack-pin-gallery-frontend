// * components
import PinImg from './PinImg';
import PinContent from './PinContent';
import PinComments from './PinComments/index';

const PinInfo = () => (
    <div className="flex gap-10 flex-col lg:flex-row">
        <PinImg />
        <div className="bg-white w-full p-4 rounded-xl shadow-md flex flex-col items-start justify-start gap-3">
            <PinContent />
            <PinComments />
        </div>
    </div>
);

export default PinInfo;
