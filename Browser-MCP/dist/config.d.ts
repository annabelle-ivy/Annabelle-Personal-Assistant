export interface ProxyEnv {
    BROWSER_PROXY_ENABLED?: string;
    BROWSER_PROXY_SERVER?: string;
    BROWSER_PROXY_USERNAME?: string;
    BROWSER_PROXY_PASSWORD?: string;
    BROWSER_PROXY_BYPASS?: string;
    BROWSER_ISOLATED?: string;
    [key: string]: string | undefined;
}
export interface ProxyResult {
    useProxy: boolean;
    warning?: string;
}
/** Browser launch config matching @playwright/mcp's Config shape */
export interface BrowserConfig {
    browser?: {
        isolated?: boolean;
        launchOptions?: {
            headless?: boolean;
            proxy?: {
                server: string;
                username?: string;
                password?: string;
                bypass?: string;
            };
        };
    };
}
/**
 * Determine whether proxy should be active based on env vars.
 * Proxy is OFF by default. Requires both BROWSER_PROXY_ENABLED=true AND BROWSER_PROXY_SERVER.
 */
export declare function resolveProxy(env: ProxyEnv): ProxyResult;
/**
 * Build the @playwright/mcp Config from environment variables.
 */
export declare function buildConfig(env: ProxyEnv): BrowserConfig;
//# sourceMappingURL=config.d.ts.map