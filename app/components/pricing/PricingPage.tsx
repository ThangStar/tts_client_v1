import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Miễn phí",
    price: "0",
    period: "month",
    type: 1,
    features: [
      { text: "Số lượng ký tự 3.000/ngày", enabled: true },
      { text: "Ngôn ngữ Tiếng Việt", enabled: true },
      { text: "Nghe thử", enabled: false },
      { text: "Ký tự tối đa / chuyển đổi 500", enabled: true },
      { text: "Lượt tải xuống 1 lần / ngày", enabled: true },
      { text: "Số thiết bị đồng thời 1 thiết bị", enabled: true },
    ],
    buttonText: "Mặc định",
    popular: false,
    isDefault: true,
  },
  {
    name: "Tiêu chuẩn",
    price: "199.000",
    period: "month",
    type: 2,
    features: [
      { text: "Số lượng ký tự 300.000", enabled: true },
      { text: "Ngôn ngữ Tiếng Việt", enabled: true },
      { text: "Nghe thử 500 ký tự / lần", enabled: true },
      { text: "Ký tự tối đa / chuyển đổi 20.000", enabled: true },
      { text: "Lượt tải xuống Không giới hạn", enabled: true },
      { text: "Số thiết bị đồng thời 2 thiết bị", enabled: true },
    ],
    buttonText: "Chọn gói",
    popular: false,
  },
  {
    name: "Chuyên nghiệp",
    price: "399.000",
    period: "month",
    type: 3,
    features: [
      { text: "Số lượng ký tự 600.000", enabled: true },
      { text: "Ngôn ngữ Tiếng Việt & Tiếng nước ngoài", enabled: true },
      { text: "Nghe thử 1.000 ký tự / lần", enabled: true },
      { text: "Ký tự tối đa / chuyển đổi 50.000", enabled: true },
      { text: "Lượt tải xuống Không giới hạn", enabled: true },
      { text: "Số thiết bị đồng thời 3 thiết bị", enabled: true },
    ],
    buttonText: "MUA NGAY",
    popular: true,
  },
  {
    name: "Đặc biệt",
    price: "799.000",
    period: "month",
    type: 4,
    features: [
      { text: "Số lượng ký tự 1.300.000", enabled: true },
      { text: "Ngôn ngữ Tiếng Việt & Tiếng nước ngoài", enabled: true },
      { text: "Nghe thử 1.500 ký tự / lần", enabled: true },
      { text: "Ký tự tối đa / chuyển đổi 100.000", enabled: true },
      { text: "Lượt tải xuống Không giới hạn", enabled: true },
      { text: "Số thiết bị đồng thời 5 thiết bị", enabled: true },
    ],
    buttonText: "Chọn gói",
    popular: false,
  },
];

export default function PricingPage() {
  const router = useRouter();

  const handleSelectPlan = (plan: any) => {
    if (plan.isDefault) return;
    router.push(`/payment?period=${plan.period}&type=${plan.type}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index}
            className={`w-[300px] border-2 ${
              plan.popular 
                ? 'border-primary shadow-lg shadow-primary/25' 
                : 'border-transparent hover:border-primary/50'
            } transition-all duration-300`}
          >
            <CardHeader className="flex flex-col gap-2 p-6">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-primary">đ</span>
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-sm text-default-500">{plan.period}</span>
              </div>
            </CardHeader>
            <CardBody className="px-6 pb-6">
              <div className="flex flex-col gap-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {feature.enabled ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-default-400" />
                    )}
                    <span className="text-sm text-default-600">{feature.text}</span>
                  </div>
                ))}
              </div>
              <Button
                className={`mt-6 w-full font-medium ${
                  plan.popular
                    ? 'bg-primary text-white shadow-lg hover:shadow-primary/25'
                    : plan.isDefault 
                      ? 'bg-default-200 cursor-not-allowed opacity-50' 
                      : 'bg-default-100 hover:bg-primary/10'
                } transition-all duration-300`}
                onClick={() => handleSelectPlan(plan)}
                isDisabled={plan.isDefault}
              >
                {plan.buttonText}
              </Button>
              {plan.popular && (
                <div className="mt-2 text-center">
                  <span className="text-sm text-primary">86% người dùng lựa chọn</span>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}