import { getMenu } from "./getMenu"
import { getSiteConfig } from "./getSiteConfig"
import { getTags } from "./getTags"

export const getConfig = async () => {
    return {
        config: await getSiteConfig(),
        menu: await getMenu(),
        tags: await getTags(),
    }
}