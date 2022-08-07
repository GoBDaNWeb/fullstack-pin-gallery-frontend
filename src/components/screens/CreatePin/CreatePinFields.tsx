// * react
import React, { memo, useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {ICreatePinFieldsProps} from './types'

// * redux
import {useAddPinMutation} from '@services/pin/pinApi'

// * components 
import Button from '@components/UI/Button'
import Input from '@components/UI/Input'

const CreatePinFields: React.FC<ICreatePinFieldsProps> = memo(({pinImage}) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const navigate = useNavigate()
    const [addPin] = useAddPinMutation()


    const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'title') {
            setTitle(value)
        }
        if (name === 'description') {
            setDescription(value)
        }
    }, [])

    const createPin = async () => {
        const pinParams = {
            pinImage,
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
})

export default CreatePinFields