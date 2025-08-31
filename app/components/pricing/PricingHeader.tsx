import { Tabs, Tab } from "@nextui-org/react";

export default function PricingHeader() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-8 text-xl">
          <a href="#" className="border-b-2 border-primary pb-2 text-primary font-medium">CHỮ THÀNH LỜI</a>
        </div>

        <Tabs
          aria-label="Pricing periods"
          color="primary"
          variant="light"
          classNames={{
            tabList: "gap-4",
            cursor: "bg-primary",
            tab: "h-10",
          }}
        >
          <Tab key="month" title="VĨNH VIỄN" />
          {/* <Tab
            key="year"
            title={
              <div className="flex items-center gap-2">
                <span>Theo năm</span>
                <span className="bg-primary/10 text-xs px-2 py-1 rounded">GIẢM 20%</span>
              </div>
            }
          /> */}
        </Tabs>

      </div>
    </div>
  );
}