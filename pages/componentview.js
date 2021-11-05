import TemplateProvider from "../components/templates";

function CompViewPage() {
  return <div className="p-2">
    { TemplateProvider()['TopNav']['TopNav']}
    { TemplateProvider()['Hero']['Hero']}
    { TemplateProvider()['Team']['Team']}
    { TemplateProvider()['Testimonial']['Testimonial']}
    { TemplateProvider()['Testimonial']['Testimonial2']}

  </div>;
}
export default CompViewPage;
