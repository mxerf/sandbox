import { CodeBlock } from "@/shared/ui/code-block";
import { CopyToClipboard } from "@/shared/ui/copy-to-clickboard";
import * as Tabs from "@radix-ui/react-tabs";
import { ComponentItemType } from "./components-list/api/data";

interface ISideContent {
  data: ComponentItemType;
}

const SideContent = ({ data }: ISideContent) => {
  return (
    <div className='w-full h-full flex flex-col gap-4 bg-foreground/5 p-8 rounded-3xl pointer-events-auto'>
      <div className='text-2xl'>{data.name}</div>
      <div className='w-full max-w-2xl h-full p-2'>
        <Tabs.Root
          className='relative h-full'
          defaultValue={data.code[0]?.slug}>
          <Tabs.List
            aria-orientation='horizontal'
            className='relative'
            role='tablist'
            style={{ scrollbarWidth: "none" }}>
            {data.code.map((code) => (
              <Tabs.Trigger
                className='group relative pt-3 pr-2 pb-2 pl-2 font-medium text-sm text-foreground/80 transition-colors data-[state=active]:text-[#80A665] dark:text-zinc-400 dark:data-[state=active]:text-[#80A665] cursor-pointer'
                key={code.slug}
                value={code.slug}>
                {code.slug}
                <div className='bottom-1 absolute right-2 left-2 h-0.5 scale-x-0 rounded-full bg-[#80A665] opacity-0 transition group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 dark:h-px dark:bg-[#80A665]' />
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {data.code.map((code) => (
            <Tabs.Content
              key={code.slug}
              value={code.slug}
              className='h-full'>
              <div className='h-full'>
                <div className='flex items-center justify-between w-full '>
                  <figcaption className='py-2 text-sm text-neutral-500'>{code.fileName}</figcaption>
                  <CopyToClipboard code={code.code} />
                </div>
                <CodeBlock>{code.code}</CodeBlock>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </div>
  );
};

export default SideContent;
