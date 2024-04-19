declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * 项目名称
     */
    readonly APP_NAME: string;
    /**
     * MySql 用户
     */
    readonly MYSQL_USER: string;
    /**
     * MySql 密码
     */
    readonly MYSQL_PASSWORD: string;
    /**
     * MySql 数据库名称
     */
    readonly MYSQL_DB: string;
    /**
     * MySql 地址
     */
    readonly DB_HOST: string;
    /**
     * MySql 端口
     */
    readonly DB_PORT: string;
    /**
     * sqlite 数据库地址
     */
    readonly SQLITE_DB: string;
    /**
     * Redis 地址
     */
    readonly REDIS_HOST: string;
    /**
     * Redis 端口
     */
    readonly REDIS_PORT: string;
    /**
     * Nest 端口
     */
    readonly PORT: string;
    /**
     * Swagger 是否开启
     */
    readonly SWAGGER_ENABLE: '0' | '1';
    /**
     * Swagger 标题
     */
    readonly SWAGGER_TITLE: string;
    /**
     * TypeOrm 是否同步
     */
    readonly SYNCHRONIZE: '0' | '1';
    /**
     * 项目环境
     */
    readonly NODE_ENV: 'dev' | 'production';
    /**
     * bodyParser maximum request body size
     */
    readonly MAX_BODY_SIZE: string;
  }
}
