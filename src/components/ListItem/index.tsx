type ListItemProps = {
    name: string;
    description: string;
    image: string;
};
export const ListItem = ({name, description, image}: ListItemProps) => {
    return <div className={'max-w-full h-28 rounded-lg bg-gray-100 p-2 shadow'}>
        <div className={'flex gap-2 items-center'}>
            <img src={image} alt={'placeholder'} className={'rounded-full w-10 h-10'}/>
            <span className={'font-bold'}>{name}</span>
        </div>
        <p className={'text-slate-500'}>{description}
        </p>
    </div>
}