import { useParams } from "react-router-dom";
import { cateringServices } from "../data";
import ServiceDetail from "./ServiceDetail";

export default function CateringService() {
  const { slug } = useParams();
  const service = cateringServices.find((item) => item.slug === slug) || cateringServices[0];

  return <ServiceDetail service={service} basePath="/catering" />;
}
