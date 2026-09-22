import ServiceListing from "./ServiceListing";
import { cleaningServices } from "../data";

export default function Cleaning() {
  return <ServiceListing type="cleaning" services={cleaningServices} />;
}
