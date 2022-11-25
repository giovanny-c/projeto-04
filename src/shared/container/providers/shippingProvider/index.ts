import { container } from "tsyringe";
import "dotenv/config"
import { IShippingProvider } from "./IShippingProvider";
import { CorreiosShippingProvider } from "./implementations/CorreiosShippingProvider";


container.registerSingleton<IShippingProvider>(
    "ShippingProvider",
    CorreiosShippingProvider
)