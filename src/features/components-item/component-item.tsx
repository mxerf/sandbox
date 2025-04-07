import { ComponentItemType } from "@/widgets/components-list/api/data";

interface IComponentItem {
  item: ComponentItemType;
  onClick: (elem: ComponentItemType) => void;
}

const ComponentItem = ({ item, onClick }: IComponentItem) => {
  return (
    <div className='p-4 border-foreground/10 border-1 rounded-2xl flex flex-col gap-4 w-56 h-64'>
      <p
        onClick={() => onClick(item)}
        className='text-foreground/80 cursor-pointer hover:text-foreground/50 transition-colors'>
        {item.name}
      </p>
      <div className='flex justify-center items-center h-full'>{item.component}</div>
    </div>
  );
};

export default ComponentItem;
