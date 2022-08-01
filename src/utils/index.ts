export const findRouterByPath = (routes: any[], path: string): any => {
    for (const key in routes) {
        const item = routes[key];
        //因为获取了所有的路由，只用看children是否存在传递过来的路由。
        if (item.children && item.children.length) {
            return findRouterByPath(item.children, path) as any;
        } else {
            if (item.path === path) {
                return item;
            }
        }
    }
};

export const generateMenus = (routes: any[]) => {
    let result: any[] = [];
    routes.forEach((item, index) => {
        const find = findRouterByPath(routes, item.path);
        if (!find && item.meta && item.meta.title) {
            result.push(item);
        }
    });
    return result;
};
