import Render from "./RenderPlans";

export default {
    title: 'Plantcard',
    component: Render
}

// export const plantcard = () => <Render plant={"Zamia"} seed={1} status={90} title={"New Title"} content={"New Content"} />
// const Template = (args) => <Render {...args} />;
// export const Primary = Template.bind({});
/*
Primary.args = {
    plant: "Zamia",
    title: 'Title',
  };
*/
export const plantcard = (args) => <Render {...args}/>
plantcard.args = {
    plant: "Zamia",
    seed: 1,
    status: 80,
    title: "Hello World",
    start: "2022-04-01",
    due: "2023-07-07",
    content: "Happy Graduation!" 
  };