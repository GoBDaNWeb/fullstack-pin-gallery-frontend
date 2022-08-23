// * react
import { memo } from 'react';
import Button from '@components/ui/Button';
import { IProfileFeedProps } from '../../types';

// *components

const Buttons: React.FC<IProfileFeedProps> = memo(
    ({ isCreated, setIsCreated }) => {
        const handleFetchCreatedPins = () => {
            setIsCreated(true);
        };

        const handleFetchSavedPins = () => {
            setIsCreated(false);
        };

        return (
            <div className="flex items-center justify-center gap-4 pb-6">
                <Button
                    content="Созданные"
                    condition={isCreated}
                    func={handleFetchCreatedPins}
                />
                <Button
                    content="Сохраненные"
                    condition={!isCreated}
                    func={handleFetchSavedPins}
                />
            </div>
        );
    },
);

export default Buttons;
