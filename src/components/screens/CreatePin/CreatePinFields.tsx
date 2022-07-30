// * react
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

// * redux
import {useAddPinMutation} from '../../../redux/pin/pinApi'

// * components 
import Button from '../../UI/Button'
import Input from '../../UI/Input'

const CreatePinFields = ({imageUrl}: {imageUrl: string}) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const [addPin] = useAddPinMutation()

    const navigate = useNavigate()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'title') {
            setTitle(value)
        }
        if (name === 'description') {
            setDescription(value)
        }
    }

    const createPin = async () => {
        const pinParams = {
            imageUrl,
            title,
            description,
        }
        const data = await addPin(pinParams).unwrap()
        navigate(`/pin/${data?._id}`)
    }

    return (
        <>
            <div className='flex flex-col w-full gap-2'>
                <Input
                    func={handleChangeValue}
                    type={'text'}
                    placeholder={'название'}
                    name={'title'}
                />
                <Input
                    func={handleChangeValue}
                    type={'text'}
                    placeholder={'описание'}
                    name={'description'}
                />
            </div>
            <Button 
                content={'создать'} 
                condition={false}
                func={createPin}
            />
        </>
    )
}

export default CreatePinFields