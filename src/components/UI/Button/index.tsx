const Button = ({content, condition, func}: {content: string, condition: boolean | void, func: any}) => {
    return (
        <button 
            onClick={func}
            className={`text-xl border-[1px] border-solid border-black px-6 pb-1 rounded-full hover:bg-black hover:text-white transition ${condition && 'bg-black text-white'}`}
        >
            {content}
        </button>
    )
}

export default Button