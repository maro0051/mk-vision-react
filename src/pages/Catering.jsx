import ServiceListing from "./ServiceListing";
import { cateringServices } from "../data";

export default function Catering() {
  return <ServiceListing type="catering" services={cateringServices} />;
}
