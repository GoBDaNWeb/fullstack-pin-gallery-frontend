const Input = ({func, type, placeholder, name, value}: {func: any, type: string, placeholder: string, name: string, value?: string}) => {
    return (
        <input 
            onChange={func}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            className='border-solid rounded-full h-10 px-2 border-[1px] border-gray-200 bg-gray-100 outline-none w-full' 
        />
    ) 
}

export default Input