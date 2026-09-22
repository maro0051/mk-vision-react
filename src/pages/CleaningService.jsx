import { useParams } from "react-router-dom";
import { cleaningServices } from "../data";
import ServiceDetail from "./ServiceDetail";

export default function CleaningService() {
  const { slug } = useParams();
  const service = cleaningServices.find((item) => item.slug === slug) || cleaningServices[0];

  return <ServiceDetail service={service} basePath="/cleaning" />;
}
