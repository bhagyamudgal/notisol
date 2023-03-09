import dynamic from "next/dynamic";

const NoSSR = (props: any) => {
    return props.children;
};

export default dynamic(() => Promise.resolve(NoSSR), {
    ssr: false,
});
