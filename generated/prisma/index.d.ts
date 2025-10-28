
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model projects
 * 
 */
export type projects = $Result.DefaultSelection<Prisma.$projectsPayload>
/**
 * Model categories
 * 
 */
export type categories = $Result.DefaultSelection<Prisma.$categoriesPayload>
/**
 * Model admins
 * 
 */
export type admins = $Result.DefaultSelection<Prisma.$adminsPayload>
/**
 * Model educations
 * 
 */
export type educations = $Result.DefaultSelection<Prisma.$educationsPayload>
/**
 * Model achievements
 * 
 */
export type achievements = $Result.DefaultSelection<Prisma.$achievementsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.projects.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.projects.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.projects`: Exposes CRUD operations for the **projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.projectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categories`: Exposes CRUD operations for the **categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): Prisma.categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admins`: Exposes CRUD operations for the **admins** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admins.findMany()
    * ```
    */
  get admins(): Prisma.adminsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.educations`: Exposes CRUD operations for the **educations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Educations
    * const educations = await prisma.educations.findMany()
    * ```
    */
  get educations(): Prisma.educationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievements`: Exposes CRUD operations for the **achievements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievements.findMany()
    * ```
    */
  get achievements(): Prisma.achievementsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    projects: 'projects',
    categories: 'categories',
    admins: 'admins',
    educations: 'educations',
    achievements: 'achievements'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "projects" | "categories" | "admins" | "educations" | "achievements"
      txIsolationLevel: never
    }
    model: {
      projects: {
        payload: Prisma.$projectsPayload<ExtArgs>
        fields: Prisma.projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findFirst: {
            args: Prisma.projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findMany: {
            args: Prisma.projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          create: {
            args: Prisma.projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          createMany: {
            args: Prisma.projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          update: {
            args: Prisma.projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          deleteMany: {
            args: Prisma.projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          aggregate: {
            args: Prisma.ProjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjects>
          }
          groupBy: {
            args: Prisma.projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.projectsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.projectsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.projectsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectsCountAggregateOutputType> | number
          }
        }
      }
      categories: {
        payload: Prisma.$categoriesPayload<ExtArgs>
        fields: Prisma.categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findFirst: {
            args: Prisma.categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findMany: {
            args: Prisma.categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          create: {
            args: Prisma.categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          createMany: {
            args: Prisma.categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          update: {
            args: Prisma.categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          deleteMany: {
            args: Prisma.categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          aggregate: {
            args: Prisma.CategoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategories>
          }
          groupBy: {
            args: Prisma.categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.categoriesFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.categoriesAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesCountAggregateOutputType> | number
          }
        }
      }
      admins: {
        payload: Prisma.$adminsPayload<ExtArgs>
        fields: Prisma.adminsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>
          }
          findFirst: {
            args: Prisma.adminsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>
          }
          findMany: {
            args: Prisma.adminsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>[]
          }
          create: {
            args: Prisma.adminsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>
          }
          createMany: {
            args: Prisma.adminsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.adminsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>
          }
          update: {
            args: Prisma.adminsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>
          }
          deleteMany: {
            args: Prisma.adminsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.adminsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminsPayload>
          }
          aggregate: {
            args: Prisma.AdminsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmins>
          }
          groupBy: {
            args: Prisma.adminsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.adminsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.adminsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.adminsCountArgs<ExtArgs>
            result: $Utils.Optional<AdminsCountAggregateOutputType> | number
          }
        }
      }
      educations: {
        payload: Prisma.$educationsPayload<ExtArgs>
        fields: Prisma.educationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.educationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.educationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>
          }
          findFirst: {
            args: Prisma.educationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.educationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>
          }
          findMany: {
            args: Prisma.educationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>[]
          }
          create: {
            args: Prisma.educationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>
          }
          createMany: {
            args: Prisma.educationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.educationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>
          }
          update: {
            args: Prisma.educationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>
          }
          deleteMany: {
            args: Prisma.educationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.educationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.educationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$educationsPayload>
          }
          aggregate: {
            args: Prisma.EducationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEducations>
          }
          groupBy: {
            args: Prisma.educationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<EducationsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.educationsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.educationsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.educationsCountArgs<ExtArgs>
            result: $Utils.Optional<EducationsCountAggregateOutputType> | number
          }
        }
      }
      achievements: {
        payload: Prisma.$achievementsPayload<ExtArgs>
        fields: Prisma.achievementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.achievementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.achievementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          findFirst: {
            args: Prisma.achievementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.achievementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          findMany: {
            args: Prisma.achievementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>[]
          }
          create: {
            args: Prisma.achievementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          createMany: {
            args: Prisma.achievementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.achievementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          update: {
            args: Prisma.achievementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          deleteMany: {
            args: Prisma.achievementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.achievementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.achievementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$achievementsPayload>
          }
          aggregate: {
            args: Prisma.AchievementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievements>
          }
          groupBy: {
            args: Prisma.achievementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.achievementsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.achievementsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.achievementsCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    projects?: projectsOmit
    categories?: categoriesOmit
    admins?: adminsOmit
    educations?: educationsOmit
    achievements?: achievementsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoriesCountOutputType
   */

  export type CategoriesCountOutputType = {
    project: number
  }

  export type CategoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | CategoriesCountOutputTypeCountProjectArgs
  }

  // Custom InputTypes
  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesCountOutputType
     */
    select?: CategoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model projects
   */

  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    detailedDescription: string | null
    categoryId: string | null
    imageUrl: string | null
    imagePath: string | null
    liveUrl: string | null
    githubUrl: string | null
    completionDate: string | null
    teamSize: string | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    detailedDescription: string | null
    categoryId: string | null
    imageUrl: string | null
    imagePath: string | null
    liveUrl: string | null
    githubUrl: string | null
    completionDate: string | null
    teamSize: string | null
    featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    detailedDescription: number
    categoryId: number
    tags: number
    technologies: number
    features: number
    imageUrl: number
    imagePath: number
    liveUrl: number
    githubUrl: number
    completionDate: number
    teamSize: number
    featured: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    detailedDescription?: true
    categoryId?: true
    imageUrl?: true
    imagePath?: true
    liveUrl?: true
    githubUrl?: true
    completionDate?: true
    teamSize?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    detailedDescription?: true
    categoryId?: true
    imageUrl?: true
    imagePath?: true
    liveUrl?: true
    githubUrl?: true
    completionDate?: true
    teamSize?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    detailedDescription?: true
    categoryId?: true
    tags?: true
    technologies?: true
    features?: true
    imageUrl?: true
    imagePath?: true
    liveUrl?: true
    githubUrl?: true
    completionDate?: true
    teamSize?: true
    featured?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to aggregate.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type projectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithAggregationInput | projectsOrderByWithAggregationInput[]
    by: ProjectsScalarFieldEnum[] | ProjectsScalarFieldEnum
    having?: projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }

  export type ProjectsGroupByOutputType = {
    id: string
    title: string
    description: string
    detailedDescription: string | null
    categoryId: string
    tags: string[]
    technologies: string[]
    features: string[]
    imageUrl: string
    imagePath: string
    liveUrl: string | null
    githubUrl: string
    completionDate: string | null
    teamSize: string | null
    featured: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProjectsCountAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type projectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    detailedDescription?: boolean
    categoryId?: boolean
    tags?: boolean
    technologies?: boolean
    features?: boolean
    imageUrl?: boolean
    imagePath?: boolean
    liveUrl?: boolean
    githubUrl?: boolean
    completionDate?: boolean
    teamSize?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | categoriesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>



  export type projectsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    detailedDescription?: boolean
    categoryId?: boolean
    tags?: boolean
    technologies?: boolean
    features?: boolean
    imageUrl?: boolean
    imagePath?: boolean
    liveUrl?: boolean
    githubUrl?: boolean
    completionDate?: boolean
    teamSize?: boolean
    featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type projectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "detailedDescription" | "categoryId" | "tags" | "technologies" | "features" | "imageUrl" | "imagePath" | "liveUrl" | "githubUrl" | "completionDate" | "teamSize" | "featured" | "createdAt" | "updatedAt", ExtArgs["result"]["projects"]>
  export type projectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | categoriesDefaultArgs<ExtArgs>
  }

  export type $projectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "projects"
    objects: {
      category: Prisma.$categoriesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      detailedDescription: string | null
      categoryId: string
      tags: string[]
      technologies: string[]
      features: string[]
      imageUrl: string
      imagePath: string
      liveUrl: string | null
      githubUrl: string
      completionDate: string | null
      teamSize: string | null
      featured: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projects"]>
    composites: {}
  }

  type projectsGetPayload<S extends boolean | null | undefined | projectsDefaultArgs> = $Result.GetResult<Prisma.$projectsPayload, S>

  type projectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectsCountAggregateInputType | true
    }

  export interface projectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['projects'], meta: { name: 'projects' } }
    /**
     * Find zero or one Projects that matches the filter.
     * @param {projectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectsFindUniqueArgs>(args: SelectSubset<T, projectsFindUniqueArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectsFindFirstArgs>(args?: SelectSubset<T, projectsFindFirstArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectsWithIdOnly = await prisma.projects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends projectsFindManyArgs>(args?: SelectSubset<T, projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projects.
     * @param {projectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
     */
    create<T extends projectsCreateArgs>(args: SelectSubset<T, projectsCreateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectsCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectsCreateManyArgs>(args?: SelectSubset<T, projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Projects.
     * @param {projectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
     */
    delete<T extends projectsDeleteArgs>(args: SelectSubset<T, projectsDeleteArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projects.
     * @param {projectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectsUpdateArgs>(args: SelectSubset<T, projectsUpdateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectsDeleteManyArgs>(args?: SelectSubset<T, projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectsUpdateManyArgs>(args: SelectSubset<T, projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Projects.
     * @param {projectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
     */
    upsert<T extends projectsUpsertArgs>(args: SelectSubset<T, projectsUpsertArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * @param {projectsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const projects = await prisma.projects.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: projectsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Projects.
     * @param {projectsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const projects = await prisma.projects.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: projectsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectsCountArgs>(
      args?: Subset<T, projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): Prisma.PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectsGroupByArgs['orderBy'] }
        : { orderBy?: projectsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the projects model
   */
  readonly fields: projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends categoriesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoriesDefaultArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the projects model
   */
  interface projectsFieldRefs {
    readonly id: FieldRef<"projects", 'String'>
    readonly title: FieldRef<"projects", 'String'>
    readonly description: FieldRef<"projects", 'String'>
    readonly detailedDescription: FieldRef<"projects", 'String'>
    readonly categoryId: FieldRef<"projects", 'String'>
    readonly tags: FieldRef<"projects", 'String[]'>
    readonly technologies: FieldRef<"projects", 'String[]'>
    readonly features: FieldRef<"projects", 'String[]'>
    readonly imageUrl: FieldRef<"projects", 'String'>
    readonly imagePath: FieldRef<"projects", 'String'>
    readonly liveUrl: FieldRef<"projects", 'String'>
    readonly githubUrl: FieldRef<"projects", 'String'>
    readonly completionDate: FieldRef<"projects", 'String'>
    readonly teamSize: FieldRef<"projects", 'String'>
    readonly featured: FieldRef<"projects", 'Boolean'>
    readonly createdAt: FieldRef<"projects", 'DateTime'>
    readonly updatedAt: FieldRef<"projects", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * projects findUnique
   */
  export type projectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findUniqueOrThrow
   */
  export type projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findFirst
   */
  export type projectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findFirstOrThrow
   */
  export type projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findMany
   */
  export type projectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects create
   */
  export type projectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a projects.
     */
    data: XOR<projectsCreateInput, projectsUncheckedCreateInput>
  }

  /**
   * projects createMany
   */
  export type projectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
  }

  /**
   * projects update
   */
  export type projectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a projects.
     */
    data: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
    /**
     * Choose, which projects to update.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects updateMany
   */
  export type projectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects upsert
   */
  export type projectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the projects to update in case it exists.
     */
    where: projectsWhereUniqueInput
    /**
     * In case the projects found by the `where` argument doesn't exist, create a new projects with this data.
     */
    create: XOR<projectsCreateInput, projectsUncheckedCreateInput>
    /**
     * In case the projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
  }

  /**
   * projects delete
   */
  export type projectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter which projects to delete.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects deleteMany
   */
  export type projectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * projects findRaw
   */
  export type projectsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * projects aggregateRaw
   */
  export type projectsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * projects without action
   */
  export type projectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
  }


  /**
   * Model categories
   */

  export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  export type CategoriesMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type CategoriesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
  }

  export type CategoriesCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type CategoriesMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type CategoriesMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type CategoriesCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type CategoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to aggregate.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesMaxAggregateInputType
  }

  export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategories[P]>
      : GetScalarType<T[P], AggregateCategories[P]>
  }




  export type categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithAggregationInput | categoriesOrderByWithAggregationInput[]
    by: CategoriesScalarFieldEnum[] | CategoriesScalarFieldEnum
    having?: categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesCountAggregateInputType | true
    _min?: CategoriesMinAggregateInputType
    _max?: CategoriesMaxAggregateInputType
  }

  export type CategoriesGroupByOutputType = {
    id: string
    name: string
    description: string
    _count: CategoriesCountAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  type GetCategoriesGroupByPayload<T extends categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
        }
      >
    >


  export type categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    project?: boolean | categories$projectArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>



  export type categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description", ExtArgs["result"]["categories"]>
  export type categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | categories$projectArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categories"
    objects: {
      project: Prisma.$projectsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
    }, ExtArgs["result"]["categories"]>
    composites: {}
  }

  type categoriesGetPayload<S extends boolean | null | undefined | categoriesDefaultArgs> = $Result.GetResult<Prisma.$categoriesPayload, S>

  type categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriesCountAggregateInputType | true
    }

  export interface categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categories'], meta: { name: 'categories' } }
    /**
     * Find zero or one Categories that matches the filter.
     * @param {categoriesFindUniqueArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoriesFindUniqueArgs>(args: SelectSubset<T, categoriesFindUniqueArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoriesFindUniqueOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoriesFindFirstArgs>(args?: SelectSubset<T, categoriesFindFirstArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categories.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesWithIdOnly = await prisma.categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoriesFindManyArgs>(args?: SelectSubset<T, categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categories.
     * @param {categoriesCreateArgs} args - Arguments to create a Categories.
     * @example
     * // Create one Categories
     * const Categories = await prisma.categories.create({
     *   data: {
     *     // ... data to create a Categories
     *   }
     * })
     * 
     */
    create<T extends categoriesCreateArgs>(args: SelectSubset<T, categoriesCreateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoriesCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoriesCreateManyArgs>(args?: SelectSubset<T, categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Categories.
     * @param {categoriesDeleteArgs} args - Arguments to delete one Categories.
     * @example
     * // Delete one Categories
     * const Categories = await prisma.categories.delete({
     *   where: {
     *     // ... filter to delete one Categories
     *   }
     * })
     * 
     */
    delete<T extends categoriesDeleteArgs>(args: SelectSubset<T, categoriesDeleteArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categories.
     * @param {categoriesUpdateArgs} args - Arguments to update one Categories.
     * @example
     * // Update one Categories
     * const categories = await prisma.categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoriesUpdateArgs>(args: SelectSubset<T, categoriesUpdateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoriesDeleteManyArgs>(args?: SelectSubset<T, categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoriesUpdateManyArgs>(args: SelectSubset<T, categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Categories.
     * @param {categoriesUpsertArgs} args - Arguments to update or create a Categories.
     * @example
     * // Update or create a Categories
     * const categories = await prisma.categories.upsert({
     *   create: {
     *     // ... data to create a Categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categories we want to update
     *   }
     * })
     */
    upsert<T extends categoriesUpsertArgs>(args: SelectSubset<T, categoriesUpsertArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * @param {categoriesFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const categories = await prisma.categories.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: categoriesFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Categories.
     * @param {categoriesAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const categories = await prisma.categories.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: categoriesAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categories.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoriesCountArgs>(
      args?: Subset<T, categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesAggregateArgs>(args: Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>

    /**
     * Group by Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriesGroupByArgs['orderBy'] }
        : { orderBy?: categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categories model
   */
  readonly fields: categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends categories$projectArgs<ExtArgs> = {}>(args?: Subset<T, categories$projectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the categories model
   */
  interface categoriesFieldRefs {
    readonly id: FieldRef<"categories", 'String'>
    readonly name: FieldRef<"categories", 'String'>
    readonly description: FieldRef<"categories", 'String'>
  }
    

  // Custom InputTypes
  /**
   * categories findUnique
   */
  export type categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findUniqueOrThrow
   */
  export type categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findFirst
   */
  export type categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findFirstOrThrow
   */
  export type categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findMany
   */
  export type categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories create
   */
  export type categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a categories.
     */
    data: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
  }

  /**
   * categories createMany
   */
  export type categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
  }

  /**
   * categories update
   */
  export type categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a categories.
     */
    data: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
    /**
     * Choose, which categories to update.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories updateMany
   */
  export type categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * categories upsert
   */
  export type categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the categories to update in case it exists.
     */
    where: categoriesWhereUniqueInput
    /**
     * In case the categories found by the `where` argument doesn't exist, create a new categories with this data.
     */
    create: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
    /**
     * In case the categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
  }

  /**
   * categories delete
   */
  export type categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter which categories to delete.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories deleteMany
   */
  export type categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * categories findRaw
   */
  export type categoriesFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * categories aggregateRaw
   */
  export type categoriesAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * categories.project
   */
  export type categories$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    cursor?: projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * categories without action
   */
  export type categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
  }


  /**
   * Model admins
   */

  export type AggregateAdmins = {
    _count: AdminsCountAggregateOutputType | null
    _min: AdminsMinAggregateOutputType | null
    _max: AdminsMaxAggregateOutputType | null
  }

  export type AdminsMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type AdminsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
  }

  export type AdminsCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    _all: number
  }


  export type AdminsMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type AdminsMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
  }

  export type AdminsCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    _all?: true
  }

  export type AdminsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to aggregate.
     */
    where?: adminsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminsOrderByWithRelationInput | adminsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admins
    **/
    _count?: true | AdminsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminsMaxAggregateInputType
  }

  export type GetAdminsAggregateType<T extends AdminsAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmins]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmins[P]>
      : GetScalarType<T[P], AggregateAdmins[P]>
  }




  export type adminsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminsWhereInput
    orderBy?: adminsOrderByWithAggregationInput | adminsOrderByWithAggregationInput[]
    by: AdminsScalarFieldEnum[] | AdminsScalarFieldEnum
    having?: adminsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminsCountAggregateInputType | true
    _min?: AdminsMinAggregateInputType
    _max?: AdminsMaxAggregateInputType
  }

  export type AdminsGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    _count: AdminsCountAggregateOutputType | null
    _min: AdminsMinAggregateOutputType | null
    _max: AdminsMaxAggregateOutputType | null
  }

  type GetAdminsGroupByPayload<T extends adminsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminsGroupByOutputType[P]>
            : GetScalarType<T[P], AdminsGroupByOutputType[P]>
        }
      >
    >


  export type adminsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["admins"]>



  export type adminsSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
  }

  export type adminsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password", ExtArgs["result"]["admins"]>

  export type $adminsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admins"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
    }, ExtArgs["result"]["admins"]>
    composites: {}
  }

  type adminsGetPayload<S extends boolean | null | undefined | adminsDefaultArgs> = $Result.GetResult<Prisma.$adminsPayload, S>

  type adminsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<adminsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminsCountAggregateInputType | true
    }

  export interface adminsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admins'], meta: { name: 'admins' } }
    /**
     * Find zero or one Admins that matches the filter.
     * @param {adminsFindUniqueArgs} args - Arguments to find a Admins
     * @example
     * // Get one Admins
     * const admins = await prisma.admins.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminsFindUniqueArgs>(args: SelectSubset<T, adminsFindUniqueArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admins that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {adminsFindUniqueOrThrowArgs} args - Arguments to find a Admins
     * @example
     * // Get one Admins
     * const admins = await prisma.admins.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminsFindUniqueOrThrowArgs>(args: SelectSubset<T, adminsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsFindFirstArgs} args - Arguments to find a Admins
     * @example
     * // Get one Admins
     * const admins = await prisma.admins.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminsFindFirstArgs>(args?: SelectSubset<T, adminsFindFirstArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admins that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsFindFirstOrThrowArgs} args - Arguments to find a Admins
     * @example
     * // Get one Admins
     * const admins = await prisma.admins.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminsFindFirstOrThrowArgs>(args?: SelectSubset<T, adminsFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admins.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admins.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminsWithIdOnly = await prisma.admins.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends adminsFindManyArgs>(args?: SelectSubset<T, adminsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admins.
     * @param {adminsCreateArgs} args - Arguments to create a Admins.
     * @example
     * // Create one Admins
     * const Admins = await prisma.admins.create({
     *   data: {
     *     // ... data to create a Admins
     *   }
     * })
     * 
     */
    create<T extends adminsCreateArgs>(args: SelectSubset<T, adminsCreateArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {adminsCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admins = await prisma.admins.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminsCreateManyArgs>(args?: SelectSubset<T, adminsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admins.
     * @param {adminsDeleteArgs} args - Arguments to delete one Admins.
     * @example
     * // Delete one Admins
     * const Admins = await prisma.admins.delete({
     *   where: {
     *     // ... filter to delete one Admins
     *   }
     * })
     * 
     */
    delete<T extends adminsDeleteArgs>(args: SelectSubset<T, adminsDeleteArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admins.
     * @param {adminsUpdateArgs} args - Arguments to update one Admins.
     * @example
     * // Update one Admins
     * const admins = await prisma.admins.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminsUpdateArgs>(args: SelectSubset<T, adminsUpdateArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {adminsDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admins.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminsDeleteManyArgs>(args?: SelectSubset<T, adminsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admins = await prisma.admins.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminsUpdateManyArgs>(args: SelectSubset<T, adminsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admins.
     * @param {adminsUpsertArgs} args - Arguments to update or create a Admins.
     * @example
     * // Update or create a Admins
     * const admins = await prisma.admins.upsert({
     *   create: {
     *     // ... data to create a Admins
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admins we want to update
     *   }
     * })
     */
    upsert<T extends adminsUpsertArgs>(args: SelectSubset<T, adminsUpsertArgs<ExtArgs>>): Prisma__adminsClient<$Result.GetResult<Prisma.$adminsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * @param {adminsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const admins = await prisma.admins.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: adminsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Admins.
     * @param {adminsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const admins = await prisma.admins.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: adminsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admins.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends adminsCountArgs>(
      args?: Subset<T, adminsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminsAggregateArgs>(args: Subset<T, AdminsAggregateArgs>): Prisma.PrismaPromise<GetAdminsAggregateType<T>>

    /**
     * Group by Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminsGroupByArgs['orderBy'] }
        : { orderBy?: adminsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admins model
   */
  readonly fields: adminsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admins.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admins model
   */
  interface adminsFieldRefs {
    readonly id: FieldRef<"admins", 'String'>
    readonly name: FieldRef<"admins", 'String'>
    readonly email: FieldRef<"admins", 'String'>
    readonly password: FieldRef<"admins", 'String'>
  }
    

  // Custom InputTypes
  /**
   * admins findUnique
   */
  export type adminsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where: adminsWhereUniqueInput
  }

  /**
   * admins findUniqueOrThrow
   */
  export type adminsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where: adminsWhereUniqueInput
  }

  /**
   * admins findFirst
   */
  export type adminsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminsOrderByWithRelationInput | adminsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminsScalarFieldEnum | AdminsScalarFieldEnum[]
  }

  /**
   * admins findFirstOrThrow
   */
  export type adminsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminsOrderByWithRelationInput | adminsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminsScalarFieldEnum | AdminsScalarFieldEnum[]
  }

  /**
   * admins findMany
   */
  export type adminsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminsOrderByWithRelationInput | adminsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admins.
     */
    cursor?: adminsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    distinct?: AdminsScalarFieldEnum | AdminsScalarFieldEnum[]
  }

  /**
   * admins create
   */
  export type adminsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * The data needed to create a admins.
     */
    data: XOR<adminsCreateInput, adminsUncheckedCreateInput>
  }

  /**
   * admins createMany
   */
  export type adminsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admins.
     */
    data: adminsCreateManyInput | adminsCreateManyInput[]
  }

  /**
   * admins update
   */
  export type adminsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * The data needed to update a admins.
     */
    data: XOR<adminsUpdateInput, adminsUncheckedUpdateInput>
    /**
     * Choose, which admins to update.
     */
    where: adminsWhereUniqueInput
  }

  /**
   * admins updateMany
   */
  export type adminsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admins.
     */
    data: XOR<adminsUpdateManyMutationInput, adminsUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminsWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
  }

  /**
   * admins upsert
   */
  export type adminsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * The filter to search for the admins to update in case it exists.
     */
    where: adminsWhereUniqueInput
    /**
     * In case the admins found by the `where` argument doesn't exist, create a new admins with this data.
     */
    create: XOR<adminsCreateInput, adminsUncheckedCreateInput>
    /**
     * In case the admins was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminsUpdateInput, adminsUncheckedUpdateInput>
  }

  /**
   * admins delete
   */
  export type adminsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
    /**
     * Filter which admins to delete.
     */
    where: adminsWhereUniqueInput
  }

  /**
   * admins deleteMany
   */
  export type adminsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to delete
     */
    where?: adminsWhereInput
    /**
     * Limit how many admins to delete.
     */
    limit?: number
  }

  /**
   * admins findRaw
   */
  export type adminsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * admins aggregateRaw
   */
  export type adminsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * admins without action
   */
  export type adminsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admins
     */
    select?: adminsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admins
     */
    omit?: adminsOmit<ExtArgs> | null
  }


  /**
   * Model educations
   */

  export type AggregateEducations = {
    _count: EducationsCountAggregateOutputType | null
    _min: EducationsMinAggregateOutputType | null
    _max: EducationsMaxAggregateOutputType | null
  }

  export type EducationsMinAggregateOutputType = {
    id: string | null
    institution: string | null
    degree: string | null
    period: string | null
    location: string | null
    description: string | null
    detailedDescription: string | null
    gpa: string | null
    imageUrl: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EducationsMaxAggregateOutputType = {
    id: string | null
    institution: string | null
    degree: string | null
    period: string | null
    location: string | null
    description: string | null
    detailedDescription: string | null
    gpa: string | null
    imageUrl: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EducationsCountAggregateOutputType = {
    id: number
    institution: number
    degree: number
    period: number
    location: number
    description: number
    detailedDescription: number
    gpa: number
    courses: number
    imageUrl: number
    imagePath: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EducationsMinAggregateInputType = {
    id?: true
    institution?: true
    degree?: true
    period?: true
    location?: true
    description?: true
    detailedDescription?: true
    gpa?: true
    imageUrl?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EducationsMaxAggregateInputType = {
    id?: true
    institution?: true
    degree?: true
    period?: true
    location?: true
    description?: true
    detailedDescription?: true
    gpa?: true
    imageUrl?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EducationsCountAggregateInputType = {
    id?: true
    institution?: true
    degree?: true
    period?: true
    location?: true
    description?: true
    detailedDescription?: true
    gpa?: true
    courses?: true
    imageUrl?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EducationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which educations to aggregate.
     */
    where?: educationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of educations to fetch.
     */
    orderBy?: educationsOrderByWithRelationInput | educationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: educationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned educations
    **/
    _count?: true | EducationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EducationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EducationsMaxAggregateInputType
  }

  export type GetEducationsAggregateType<T extends EducationsAggregateArgs> = {
        [P in keyof T & keyof AggregateEducations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEducations[P]>
      : GetScalarType<T[P], AggregateEducations[P]>
  }




  export type educationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: educationsWhereInput
    orderBy?: educationsOrderByWithAggregationInput | educationsOrderByWithAggregationInput[]
    by: EducationsScalarFieldEnum[] | EducationsScalarFieldEnum
    having?: educationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EducationsCountAggregateInputType | true
    _min?: EducationsMinAggregateInputType
    _max?: EducationsMaxAggregateInputType
  }

  export type EducationsGroupByOutputType = {
    id: string
    institution: string
    degree: string
    period: string
    location: string
    description: string
    detailedDescription: string | null
    gpa: string
    courses: string[]
    imageUrl: string
    imagePath: string
    createdAt: Date
    updatedAt: Date
    _count: EducationsCountAggregateOutputType | null
    _min: EducationsMinAggregateOutputType | null
    _max: EducationsMaxAggregateOutputType | null
  }

  type GetEducationsGroupByPayload<T extends educationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EducationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EducationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EducationsGroupByOutputType[P]>
            : GetScalarType<T[P], EducationsGroupByOutputType[P]>
        }
      >
    >


  export type educationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    institution?: boolean
    degree?: boolean
    period?: boolean
    location?: boolean
    description?: boolean
    detailedDescription?: boolean
    gpa?: boolean
    courses?: boolean
    imageUrl?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["educations"]>



  export type educationsSelectScalar = {
    id?: boolean
    institution?: boolean
    degree?: boolean
    period?: boolean
    location?: boolean
    description?: boolean
    detailedDescription?: boolean
    gpa?: boolean
    courses?: boolean
    imageUrl?: boolean
    imagePath?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type educationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "institution" | "degree" | "period" | "location" | "description" | "detailedDescription" | "gpa" | "courses" | "imageUrl" | "imagePath" | "createdAt" | "updatedAt", ExtArgs["result"]["educations"]>

  export type $educationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "educations"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      institution: string
      degree: string
      period: string
      location: string
      description: string
      detailedDescription: string | null
      gpa: string
      courses: string[]
      imageUrl: string
      imagePath: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["educations"]>
    composites: {}
  }

  type educationsGetPayload<S extends boolean | null | undefined | educationsDefaultArgs> = $Result.GetResult<Prisma.$educationsPayload, S>

  type educationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<educationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EducationsCountAggregateInputType | true
    }

  export interface educationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['educations'], meta: { name: 'educations' } }
    /**
     * Find zero or one Educations that matches the filter.
     * @param {educationsFindUniqueArgs} args - Arguments to find a Educations
     * @example
     * // Get one Educations
     * const educations = await prisma.educations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends educationsFindUniqueArgs>(args: SelectSubset<T, educationsFindUniqueArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Educations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {educationsFindUniqueOrThrowArgs} args - Arguments to find a Educations
     * @example
     * // Get one Educations
     * const educations = await prisma.educations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends educationsFindUniqueOrThrowArgs>(args: SelectSubset<T, educationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {educationsFindFirstArgs} args - Arguments to find a Educations
     * @example
     * // Get one Educations
     * const educations = await prisma.educations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends educationsFindFirstArgs>(args?: SelectSubset<T, educationsFindFirstArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Educations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {educationsFindFirstOrThrowArgs} args - Arguments to find a Educations
     * @example
     * // Get one Educations
     * const educations = await prisma.educations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends educationsFindFirstOrThrowArgs>(args?: SelectSubset<T, educationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {educationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Educations
     * const educations = await prisma.educations.findMany()
     * 
     * // Get first 10 Educations
     * const educations = await prisma.educations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const educationsWithIdOnly = await prisma.educations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends educationsFindManyArgs>(args?: SelectSubset<T, educationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Educations.
     * @param {educationsCreateArgs} args - Arguments to create a Educations.
     * @example
     * // Create one Educations
     * const Educations = await prisma.educations.create({
     *   data: {
     *     // ... data to create a Educations
     *   }
     * })
     * 
     */
    create<T extends educationsCreateArgs>(args: SelectSubset<T, educationsCreateArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Educations.
     * @param {educationsCreateManyArgs} args - Arguments to create many Educations.
     * @example
     * // Create many Educations
     * const educations = await prisma.educations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends educationsCreateManyArgs>(args?: SelectSubset<T, educationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Educations.
     * @param {educationsDeleteArgs} args - Arguments to delete one Educations.
     * @example
     * // Delete one Educations
     * const Educations = await prisma.educations.delete({
     *   where: {
     *     // ... filter to delete one Educations
     *   }
     * })
     * 
     */
    delete<T extends educationsDeleteArgs>(args: SelectSubset<T, educationsDeleteArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Educations.
     * @param {educationsUpdateArgs} args - Arguments to update one Educations.
     * @example
     * // Update one Educations
     * const educations = await prisma.educations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends educationsUpdateArgs>(args: SelectSubset<T, educationsUpdateArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Educations.
     * @param {educationsDeleteManyArgs} args - Arguments to filter Educations to delete.
     * @example
     * // Delete a few Educations
     * const { count } = await prisma.educations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends educationsDeleteManyArgs>(args?: SelectSubset<T, educationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {educationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Educations
     * const educations = await prisma.educations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends educationsUpdateManyArgs>(args: SelectSubset<T, educationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Educations.
     * @param {educationsUpsertArgs} args - Arguments to update or create a Educations.
     * @example
     * // Update or create a Educations
     * const educations = await prisma.educations.upsert({
     *   create: {
     *     // ... data to create a Educations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Educations we want to update
     *   }
     * })
     */
    upsert<T extends educationsUpsertArgs>(args: SelectSubset<T, educationsUpsertArgs<ExtArgs>>): Prisma__educationsClient<$Result.GetResult<Prisma.$educationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Educations that matches the filter.
     * @param {educationsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const educations = await prisma.educations.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: educationsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Educations.
     * @param {educationsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const educations = await prisma.educations.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: educationsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {educationsCountArgs} args - Arguments to filter Educations to count.
     * @example
     * // Count the number of Educations
     * const count = await prisma.educations.count({
     *   where: {
     *     // ... the filter for the Educations we want to count
     *   }
     * })
    **/
    count<T extends educationsCountArgs>(
      args?: Subset<T, educationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EducationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EducationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EducationsAggregateArgs>(args: Subset<T, EducationsAggregateArgs>): Prisma.PrismaPromise<GetEducationsAggregateType<T>>

    /**
     * Group by Educations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {educationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends educationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: educationsGroupByArgs['orderBy'] }
        : { orderBy?: educationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, educationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the educations model
   */
  readonly fields: educationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for educations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__educationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the educations model
   */
  interface educationsFieldRefs {
    readonly id: FieldRef<"educations", 'String'>
    readonly institution: FieldRef<"educations", 'String'>
    readonly degree: FieldRef<"educations", 'String'>
    readonly period: FieldRef<"educations", 'String'>
    readonly location: FieldRef<"educations", 'String'>
    readonly description: FieldRef<"educations", 'String'>
    readonly detailedDescription: FieldRef<"educations", 'String'>
    readonly gpa: FieldRef<"educations", 'String'>
    readonly courses: FieldRef<"educations", 'String[]'>
    readonly imageUrl: FieldRef<"educations", 'String'>
    readonly imagePath: FieldRef<"educations", 'String'>
    readonly createdAt: FieldRef<"educations", 'DateTime'>
    readonly updatedAt: FieldRef<"educations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * educations findUnique
   */
  export type educationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * Filter, which educations to fetch.
     */
    where: educationsWhereUniqueInput
  }

  /**
   * educations findUniqueOrThrow
   */
  export type educationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * Filter, which educations to fetch.
     */
    where: educationsWhereUniqueInput
  }

  /**
   * educations findFirst
   */
  export type educationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * Filter, which educations to fetch.
     */
    where?: educationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of educations to fetch.
     */
    orderBy?: educationsOrderByWithRelationInput | educationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for educations.
     */
    cursor?: educationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of educations.
     */
    distinct?: EducationsScalarFieldEnum | EducationsScalarFieldEnum[]
  }

  /**
   * educations findFirstOrThrow
   */
  export type educationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * Filter, which educations to fetch.
     */
    where?: educationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of educations to fetch.
     */
    orderBy?: educationsOrderByWithRelationInput | educationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for educations.
     */
    cursor?: educationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` educations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of educations.
     */
    distinct?: EducationsScalarFieldEnum | EducationsScalarFieldEnum[]
  }

  /**
   * educations findMany
   */
  export type educationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * Filter, which educations to fetch.
     */
    where?: educationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of educations to fetch.
     */
    orderBy?: educationsOrderByWithRelationInput | educationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing educations.
     */
    cursor?: educationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` educations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` educations.
     */
    skip?: number
    distinct?: EducationsScalarFieldEnum | EducationsScalarFieldEnum[]
  }

  /**
   * educations create
   */
  export type educationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * The data needed to create a educations.
     */
    data: XOR<educationsCreateInput, educationsUncheckedCreateInput>
  }

  /**
   * educations createMany
   */
  export type educationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many educations.
     */
    data: educationsCreateManyInput | educationsCreateManyInput[]
  }

  /**
   * educations update
   */
  export type educationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * The data needed to update a educations.
     */
    data: XOR<educationsUpdateInput, educationsUncheckedUpdateInput>
    /**
     * Choose, which educations to update.
     */
    where: educationsWhereUniqueInput
  }

  /**
   * educations updateMany
   */
  export type educationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update educations.
     */
    data: XOR<educationsUpdateManyMutationInput, educationsUncheckedUpdateManyInput>
    /**
     * Filter which educations to update
     */
    where?: educationsWhereInput
    /**
     * Limit how many educations to update.
     */
    limit?: number
  }

  /**
   * educations upsert
   */
  export type educationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * The filter to search for the educations to update in case it exists.
     */
    where: educationsWhereUniqueInput
    /**
     * In case the educations found by the `where` argument doesn't exist, create a new educations with this data.
     */
    create: XOR<educationsCreateInput, educationsUncheckedCreateInput>
    /**
     * In case the educations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<educationsUpdateInput, educationsUncheckedUpdateInput>
  }

  /**
   * educations delete
   */
  export type educationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
    /**
     * Filter which educations to delete.
     */
    where: educationsWhereUniqueInput
  }

  /**
   * educations deleteMany
   */
  export type educationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which educations to delete
     */
    where?: educationsWhereInput
    /**
     * Limit how many educations to delete.
     */
    limit?: number
  }

  /**
   * educations findRaw
   */
  export type educationsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * educations aggregateRaw
   */
  export type educationsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * educations without action
   */
  export type educationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the educations
     */
    select?: educationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the educations
     */
    omit?: educationsOmit<ExtArgs> | null
  }


  /**
   * Model achievements
   */

  export type AggregateAchievements = {
    _count: AchievementsCountAggregateOutputType | null
    _min: AchievementsMinAggregateOutputType | null
    _max: AchievementsMaxAggregateOutputType | null
  }

  export type AchievementsMinAggregateOutputType = {
    id: string | null
    title: string | null
    organization: string | null
    year: string | null
    description: string | null
    detailedDescription: string | null
    imageUrl: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AchievementsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    organization: string | null
    year: string | null
    description: string | null
    detailedDescription: string | null
    imageUrl: string | null
    imagePath: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AchievementsCountAggregateOutputType = {
    id: number
    title: number
    organization: number
    year: number
    description: number
    detailedDescription: number
    imageUrl: number
    imagePath: number
    technologies: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AchievementsMinAggregateInputType = {
    id?: true
    title?: true
    organization?: true
    year?: true
    description?: true
    detailedDescription?: true
    imageUrl?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AchievementsMaxAggregateInputType = {
    id?: true
    title?: true
    organization?: true
    year?: true
    description?: true
    detailedDescription?: true
    imageUrl?: true
    imagePath?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AchievementsCountAggregateInputType = {
    id?: true
    title?: true
    organization?: true
    year?: true
    description?: true
    detailedDescription?: true
    imageUrl?: true
    imagePath?: true
    technologies?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AchievementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which achievements to aggregate.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned achievements
    **/
    _count?: true | AchievementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementsMaxAggregateInputType
  }

  export type GetAchievementsAggregateType<T extends AchievementsAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievements[P]>
      : GetScalarType<T[P], AggregateAchievements[P]>
  }




  export type achievementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: achievementsWhereInput
    orderBy?: achievementsOrderByWithAggregationInput | achievementsOrderByWithAggregationInput[]
    by: AchievementsScalarFieldEnum[] | AchievementsScalarFieldEnum
    having?: achievementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementsCountAggregateInputType | true
    _min?: AchievementsMinAggregateInputType
    _max?: AchievementsMaxAggregateInputType
  }

  export type AchievementsGroupByOutputType = {
    id: string
    title: string
    organization: string
    year: string
    description: string
    detailedDescription: string | null
    imageUrl: string
    imagePath: string
    technologies: string[]
    createdAt: Date
    updatedAt: Date
    _count: AchievementsCountAggregateOutputType | null
    _min: AchievementsMinAggregateOutputType | null
    _max: AchievementsMaxAggregateOutputType | null
  }

  type GetAchievementsGroupByPayload<T extends achievementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementsGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementsGroupByOutputType[P]>
        }
      >
    >


  export type achievementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    organization?: boolean
    year?: boolean
    description?: boolean
    detailedDescription?: boolean
    imageUrl?: boolean
    imagePath?: boolean
    technologies?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["achievements"]>



  export type achievementsSelectScalar = {
    id?: boolean
    title?: boolean
    organization?: boolean
    year?: boolean
    description?: boolean
    detailedDescription?: boolean
    imageUrl?: boolean
    imagePath?: boolean
    technologies?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type achievementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "organization" | "year" | "description" | "detailedDescription" | "imageUrl" | "imagePath" | "technologies" | "createdAt" | "updatedAt", ExtArgs["result"]["achievements"]>

  export type $achievementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "achievements"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      organization: string
      year: string
      description: string
      detailedDescription: string | null
      imageUrl: string
      imagePath: string
      technologies: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["achievements"]>
    composites: {}
  }

  type achievementsGetPayload<S extends boolean | null | undefined | achievementsDefaultArgs> = $Result.GetResult<Prisma.$achievementsPayload, S>

  type achievementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<achievementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementsCountAggregateInputType | true
    }

  export interface achievementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['achievements'], meta: { name: 'achievements' } }
    /**
     * Find zero or one Achievements that matches the filter.
     * @param {achievementsFindUniqueArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends achievementsFindUniqueArgs>(args: SelectSubset<T, achievementsFindUniqueArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {achievementsFindUniqueOrThrowArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends achievementsFindUniqueOrThrowArgs>(args: SelectSubset<T, achievementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsFindFirstArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends achievementsFindFirstArgs>(args?: SelectSubset<T, achievementsFindFirstArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsFindFirstOrThrowArgs} args - Arguments to find a Achievements
     * @example
     * // Get one Achievements
     * const achievements = await prisma.achievements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends achievementsFindFirstOrThrowArgs>(args?: SelectSubset<T, achievementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievements.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementsWithIdOnly = await prisma.achievements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends achievementsFindManyArgs>(args?: SelectSubset<T, achievementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievements.
     * @param {achievementsCreateArgs} args - Arguments to create a Achievements.
     * @example
     * // Create one Achievements
     * const Achievements = await prisma.achievements.create({
     *   data: {
     *     // ... data to create a Achievements
     *   }
     * })
     * 
     */
    create<T extends achievementsCreateArgs>(args: SelectSubset<T, achievementsCreateArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {achievementsCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievements = await prisma.achievements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends achievementsCreateManyArgs>(args?: SelectSubset<T, achievementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Achievements.
     * @param {achievementsDeleteArgs} args - Arguments to delete one Achievements.
     * @example
     * // Delete one Achievements
     * const Achievements = await prisma.achievements.delete({
     *   where: {
     *     // ... filter to delete one Achievements
     *   }
     * })
     * 
     */
    delete<T extends achievementsDeleteArgs>(args: SelectSubset<T, achievementsDeleteArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievements.
     * @param {achievementsUpdateArgs} args - Arguments to update one Achievements.
     * @example
     * // Update one Achievements
     * const achievements = await prisma.achievements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends achievementsUpdateArgs>(args: SelectSubset<T, achievementsUpdateArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {achievementsDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends achievementsDeleteManyArgs>(args?: SelectSubset<T, achievementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievements = await prisma.achievements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends achievementsUpdateManyArgs>(args: SelectSubset<T, achievementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Achievements.
     * @param {achievementsUpsertArgs} args - Arguments to update or create a Achievements.
     * @example
     * // Update or create a Achievements
     * const achievements = await prisma.achievements.upsert({
     *   create: {
     *     // ... data to create a Achievements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievements we want to update
     *   }
     * })
     */
    upsert<T extends achievementsUpsertArgs>(args: SelectSubset<T, achievementsUpsertArgs<ExtArgs>>): Prisma__achievementsClient<$Result.GetResult<Prisma.$achievementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * @param {achievementsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const achievements = await prisma.achievements.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: achievementsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Achievements.
     * @param {achievementsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const achievements = await prisma.achievements.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: achievementsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievements.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends achievementsCountArgs>(
      args?: Subset<T, achievementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementsAggregateArgs>(args: Subset<T, AchievementsAggregateArgs>): Prisma.PrismaPromise<GetAchievementsAggregateType<T>>

    /**
     * Group by Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {achievementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends achievementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: achievementsGroupByArgs['orderBy'] }
        : { orderBy?: achievementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, achievementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the achievements model
   */
  readonly fields: achievementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for achievements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__achievementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the achievements model
   */
  interface achievementsFieldRefs {
    readonly id: FieldRef<"achievements", 'String'>
    readonly title: FieldRef<"achievements", 'String'>
    readonly organization: FieldRef<"achievements", 'String'>
    readonly year: FieldRef<"achievements", 'String'>
    readonly description: FieldRef<"achievements", 'String'>
    readonly detailedDescription: FieldRef<"achievements", 'String'>
    readonly imageUrl: FieldRef<"achievements", 'String'>
    readonly imagePath: FieldRef<"achievements", 'String'>
    readonly technologies: FieldRef<"achievements", 'String[]'>
    readonly createdAt: FieldRef<"achievements", 'DateTime'>
    readonly updatedAt: FieldRef<"achievements", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * achievements findUnique
   */
  export type achievementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements findUniqueOrThrow
   */
  export type achievementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements findFirst
   */
  export type achievementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for achievements.
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of achievements.
     */
    distinct?: AchievementsScalarFieldEnum | AchievementsScalarFieldEnum[]
  }

  /**
   * achievements findFirstOrThrow
   */
  export type achievementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for achievements.
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of achievements.
     */
    distinct?: AchievementsScalarFieldEnum | AchievementsScalarFieldEnum[]
  }

  /**
   * achievements findMany
   */
  export type achievementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Filter, which achievements to fetch.
     */
    where?: achievementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of achievements to fetch.
     */
    orderBy?: achievementsOrderByWithRelationInput | achievementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing achievements.
     */
    cursor?: achievementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` achievements.
     */
    skip?: number
    distinct?: AchievementsScalarFieldEnum | AchievementsScalarFieldEnum[]
  }

  /**
   * achievements create
   */
  export type achievementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * The data needed to create a achievements.
     */
    data: XOR<achievementsCreateInput, achievementsUncheckedCreateInput>
  }

  /**
   * achievements createMany
   */
  export type achievementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many achievements.
     */
    data: achievementsCreateManyInput | achievementsCreateManyInput[]
  }

  /**
   * achievements update
   */
  export type achievementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * The data needed to update a achievements.
     */
    data: XOR<achievementsUpdateInput, achievementsUncheckedUpdateInput>
    /**
     * Choose, which achievements to update.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements updateMany
   */
  export type achievementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update achievements.
     */
    data: XOR<achievementsUpdateManyMutationInput, achievementsUncheckedUpdateManyInput>
    /**
     * Filter which achievements to update
     */
    where?: achievementsWhereInput
    /**
     * Limit how many achievements to update.
     */
    limit?: number
  }

  /**
   * achievements upsert
   */
  export type achievementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * The filter to search for the achievements to update in case it exists.
     */
    where: achievementsWhereUniqueInput
    /**
     * In case the achievements found by the `where` argument doesn't exist, create a new achievements with this data.
     */
    create: XOR<achievementsCreateInput, achievementsUncheckedCreateInput>
    /**
     * In case the achievements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<achievementsUpdateInput, achievementsUncheckedUpdateInput>
  }

  /**
   * achievements delete
   */
  export type achievementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
    /**
     * Filter which achievements to delete.
     */
    where: achievementsWhereUniqueInput
  }

  /**
   * achievements deleteMany
   */
  export type achievementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which achievements to delete
     */
    where?: achievementsWhereInput
    /**
     * Limit how many achievements to delete.
     */
    limit?: number
  }

  /**
   * achievements findRaw
   */
  export type achievementsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * achievements aggregateRaw
   */
  export type achievementsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * achievements without action
   */
  export type achievementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the achievements
     */
    select?: achievementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the achievements
     */
    omit?: achievementsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const ProjectsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    detailedDescription: 'detailedDescription',
    categoryId: 'categoryId',
    tags: 'tags',
    technologies: 'technologies',
    features: 'features',
    imageUrl: 'imageUrl',
    imagePath: 'imagePath',
    liveUrl: 'liveUrl',
    githubUrl: 'githubUrl',
    completionDate: 'completionDate',
    teamSize: 'teamSize',
    featured: 'featured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const CategoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum]


  export const AdminsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password'
  };

  export type AdminsScalarFieldEnum = (typeof AdminsScalarFieldEnum)[keyof typeof AdminsScalarFieldEnum]


  export const EducationsScalarFieldEnum: {
    id: 'id',
    institution: 'institution',
    degree: 'degree',
    period: 'period',
    location: 'location',
    description: 'description',
    detailedDescription: 'detailedDescription',
    gpa: 'gpa',
    courses: 'courses',
    imageUrl: 'imageUrl',
    imagePath: 'imagePath',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EducationsScalarFieldEnum = (typeof EducationsScalarFieldEnum)[keyof typeof EducationsScalarFieldEnum]


  export const AchievementsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    organization: 'organization',
    year: 'year',
    description: 'description',
    detailedDescription: 'detailedDescription',
    imageUrl: 'imageUrl',
    imagePath: 'imagePath',
    technologies: 'technologies',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AchievementsScalarFieldEnum = (typeof AchievementsScalarFieldEnum)[keyof typeof AchievementsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type projectsWhereInput = {
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    id?: StringFilter<"projects"> | string
    title?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    detailedDescription?: StringNullableFilter<"projects"> | string | null
    categoryId?: StringFilter<"projects"> | string
    tags?: StringNullableListFilter<"projects">
    technologies?: StringNullableListFilter<"projects">
    features?: StringNullableListFilter<"projects">
    imageUrl?: StringFilter<"projects"> | string
    imagePath?: StringFilter<"projects"> | string
    liveUrl?: StringNullableFilter<"projects"> | string | null
    githubUrl?: StringFilter<"projects"> | string
    completionDate?: StringNullableFilter<"projects"> | string | null
    teamSize?: StringNullableFilter<"projects"> | string | null
    featured?: BoolFilter<"projects"> | boolean
    createdAt?: DateTimeFilter<"projects"> | Date | string
    updatedAt?: DateTimeFilter<"projects"> | Date | string
    category?: XOR<CategoriesScalarRelationFilter, categoriesWhereInput>
  }

  export type projectsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    categoryId?: SortOrder
    tags?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    completionDate?: SortOrder
    teamSize?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: categoriesOrderByWithRelationInput
  }

  export type projectsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    title?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    detailedDescription?: StringNullableFilter<"projects"> | string | null
    categoryId?: StringFilter<"projects"> | string
    tags?: StringNullableListFilter<"projects">
    technologies?: StringNullableListFilter<"projects">
    features?: StringNullableListFilter<"projects">
    imageUrl?: StringFilter<"projects"> | string
    imagePath?: StringFilter<"projects"> | string
    liveUrl?: StringNullableFilter<"projects"> | string | null
    githubUrl?: StringFilter<"projects"> | string
    completionDate?: StringNullableFilter<"projects"> | string | null
    teamSize?: StringNullableFilter<"projects"> | string | null
    featured?: BoolFilter<"projects"> | boolean
    createdAt?: DateTimeFilter<"projects"> | Date | string
    updatedAt?: DateTimeFilter<"projects"> | Date | string
    category?: XOR<CategoriesScalarRelationFilter, categoriesWhereInput>
  }, "id">

  export type projectsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    categoryId?: SortOrder
    tags?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    completionDate?: SortOrder
    teamSize?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: projectsCountOrderByAggregateInput
    _max?: projectsMaxOrderByAggregateInput
    _min?: projectsMinOrderByAggregateInput
  }

  export type projectsScalarWhereWithAggregatesInput = {
    AND?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    OR?: projectsScalarWhereWithAggregatesInput[]
    NOT?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"projects"> | string
    title?: StringWithAggregatesFilter<"projects"> | string
    description?: StringWithAggregatesFilter<"projects"> | string
    detailedDescription?: StringNullableWithAggregatesFilter<"projects"> | string | null
    categoryId?: StringWithAggregatesFilter<"projects"> | string
    tags?: StringNullableListFilter<"projects">
    technologies?: StringNullableListFilter<"projects">
    features?: StringNullableListFilter<"projects">
    imageUrl?: StringWithAggregatesFilter<"projects"> | string
    imagePath?: StringWithAggregatesFilter<"projects"> | string
    liveUrl?: StringNullableWithAggregatesFilter<"projects"> | string | null
    githubUrl?: StringWithAggregatesFilter<"projects"> | string
    completionDate?: StringNullableWithAggregatesFilter<"projects"> | string | null
    teamSize?: StringNullableWithAggregatesFilter<"projects"> | string | null
    featured?: BoolWithAggregatesFilter<"projects"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"projects"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"projects"> | Date | string
  }

  export type categoriesWhereInput = {
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    id?: StringFilter<"categories"> | string
    name?: StringFilter<"categories"> | string
    description?: StringFilter<"categories"> | string
    project?: ProjectsListRelationFilter
  }

  export type categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    project?: projectsOrderByRelationAggregateInput
  }

  export type categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    name?: StringFilter<"categories"> | string
    description?: StringFilter<"categories"> | string
    project?: ProjectsListRelationFilter
  }, "id">

  export type categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    _count?: categoriesCountOrderByAggregateInput
    _max?: categoriesMaxOrderByAggregateInput
    _min?: categoriesMinOrderByAggregateInput
  }

  export type categoriesScalarWhereWithAggregatesInput = {
    AND?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    OR?: categoriesScalarWhereWithAggregatesInput[]
    NOT?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"categories"> | string
    name?: StringWithAggregatesFilter<"categories"> | string
    description?: StringWithAggregatesFilter<"categories"> | string
  }

  export type adminsWhereInput = {
    AND?: adminsWhereInput | adminsWhereInput[]
    OR?: adminsWhereInput[]
    NOT?: adminsWhereInput | adminsWhereInput[]
    id?: StringFilter<"admins"> | string
    name?: StringFilter<"admins"> | string
    email?: StringFilter<"admins"> | string
    password?: StringFilter<"admins"> | string
  }

  export type adminsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type adminsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: adminsWhereInput | adminsWhereInput[]
    OR?: adminsWhereInput[]
    NOT?: adminsWhereInput | adminsWhereInput[]
    name?: StringFilter<"admins"> | string
    email?: StringFilter<"admins"> | string
    password?: StringFilter<"admins"> | string
  }, "id">

  export type adminsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: adminsCountOrderByAggregateInput
    _max?: adminsMaxOrderByAggregateInput
    _min?: adminsMinOrderByAggregateInput
  }

  export type adminsScalarWhereWithAggregatesInput = {
    AND?: adminsScalarWhereWithAggregatesInput | adminsScalarWhereWithAggregatesInput[]
    OR?: adminsScalarWhereWithAggregatesInput[]
    NOT?: adminsScalarWhereWithAggregatesInput | adminsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"admins"> | string
    name?: StringWithAggregatesFilter<"admins"> | string
    email?: StringWithAggregatesFilter<"admins"> | string
    password?: StringWithAggregatesFilter<"admins"> | string
  }

  export type educationsWhereInput = {
    AND?: educationsWhereInput | educationsWhereInput[]
    OR?: educationsWhereInput[]
    NOT?: educationsWhereInput | educationsWhereInput[]
    id?: StringFilter<"educations"> | string
    institution?: StringFilter<"educations"> | string
    degree?: StringFilter<"educations"> | string
    period?: StringFilter<"educations"> | string
    location?: StringFilter<"educations"> | string
    description?: StringFilter<"educations"> | string
    detailedDescription?: StringNullableFilter<"educations"> | string | null
    gpa?: StringFilter<"educations"> | string
    courses?: StringNullableListFilter<"educations">
    imageUrl?: StringFilter<"educations"> | string
    imagePath?: StringFilter<"educations"> | string
    createdAt?: DateTimeFilter<"educations"> | Date | string
    updatedAt?: DateTimeFilter<"educations"> | Date | string
  }

  export type educationsOrderByWithRelationInput = {
    id?: SortOrder
    institution?: SortOrder
    degree?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    gpa?: SortOrder
    courses?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type educationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: educationsWhereInput | educationsWhereInput[]
    OR?: educationsWhereInput[]
    NOT?: educationsWhereInput | educationsWhereInput[]
    institution?: StringFilter<"educations"> | string
    degree?: StringFilter<"educations"> | string
    period?: StringFilter<"educations"> | string
    location?: StringFilter<"educations"> | string
    description?: StringFilter<"educations"> | string
    detailedDescription?: StringNullableFilter<"educations"> | string | null
    gpa?: StringFilter<"educations"> | string
    courses?: StringNullableListFilter<"educations">
    imageUrl?: StringFilter<"educations"> | string
    imagePath?: StringFilter<"educations"> | string
    createdAt?: DateTimeFilter<"educations"> | Date | string
    updatedAt?: DateTimeFilter<"educations"> | Date | string
  }, "id">

  export type educationsOrderByWithAggregationInput = {
    id?: SortOrder
    institution?: SortOrder
    degree?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    gpa?: SortOrder
    courses?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: educationsCountOrderByAggregateInput
    _max?: educationsMaxOrderByAggregateInput
    _min?: educationsMinOrderByAggregateInput
  }

  export type educationsScalarWhereWithAggregatesInput = {
    AND?: educationsScalarWhereWithAggregatesInput | educationsScalarWhereWithAggregatesInput[]
    OR?: educationsScalarWhereWithAggregatesInput[]
    NOT?: educationsScalarWhereWithAggregatesInput | educationsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"educations"> | string
    institution?: StringWithAggregatesFilter<"educations"> | string
    degree?: StringWithAggregatesFilter<"educations"> | string
    period?: StringWithAggregatesFilter<"educations"> | string
    location?: StringWithAggregatesFilter<"educations"> | string
    description?: StringWithAggregatesFilter<"educations"> | string
    detailedDescription?: StringNullableWithAggregatesFilter<"educations"> | string | null
    gpa?: StringWithAggregatesFilter<"educations"> | string
    courses?: StringNullableListFilter<"educations">
    imageUrl?: StringWithAggregatesFilter<"educations"> | string
    imagePath?: StringWithAggregatesFilter<"educations"> | string
    createdAt?: DateTimeWithAggregatesFilter<"educations"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"educations"> | Date | string
  }

  export type achievementsWhereInput = {
    AND?: achievementsWhereInput | achievementsWhereInput[]
    OR?: achievementsWhereInput[]
    NOT?: achievementsWhereInput | achievementsWhereInput[]
    id?: StringFilter<"achievements"> | string
    title?: StringFilter<"achievements"> | string
    organization?: StringFilter<"achievements"> | string
    year?: StringFilter<"achievements"> | string
    description?: StringFilter<"achievements"> | string
    detailedDescription?: StringNullableFilter<"achievements"> | string | null
    imageUrl?: StringFilter<"achievements"> | string
    imagePath?: StringFilter<"achievements"> | string
    technologies?: StringNullableListFilter<"achievements">
    createdAt?: DateTimeFilter<"achievements"> | Date | string
    updatedAt?: DateTimeFilter<"achievements"> | Date | string
  }

  export type achievementsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    year?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    technologies?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type achievementsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: achievementsWhereInput | achievementsWhereInput[]
    OR?: achievementsWhereInput[]
    NOT?: achievementsWhereInput | achievementsWhereInput[]
    title?: StringFilter<"achievements"> | string
    organization?: StringFilter<"achievements"> | string
    year?: StringFilter<"achievements"> | string
    description?: StringFilter<"achievements"> | string
    detailedDescription?: StringNullableFilter<"achievements"> | string | null
    imageUrl?: StringFilter<"achievements"> | string
    imagePath?: StringFilter<"achievements"> | string
    technologies?: StringNullableListFilter<"achievements">
    createdAt?: DateTimeFilter<"achievements"> | Date | string
    updatedAt?: DateTimeFilter<"achievements"> | Date | string
  }, "id">

  export type achievementsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    year?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    technologies?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: achievementsCountOrderByAggregateInput
    _max?: achievementsMaxOrderByAggregateInput
    _min?: achievementsMinOrderByAggregateInput
  }

  export type achievementsScalarWhereWithAggregatesInput = {
    AND?: achievementsScalarWhereWithAggregatesInput | achievementsScalarWhereWithAggregatesInput[]
    OR?: achievementsScalarWhereWithAggregatesInput[]
    NOT?: achievementsScalarWhereWithAggregatesInput | achievementsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"achievements"> | string
    title?: StringWithAggregatesFilter<"achievements"> | string
    organization?: StringWithAggregatesFilter<"achievements"> | string
    year?: StringWithAggregatesFilter<"achievements"> | string
    description?: StringWithAggregatesFilter<"achievements"> | string
    detailedDescription?: StringNullableWithAggregatesFilter<"achievements"> | string | null
    imageUrl?: StringWithAggregatesFilter<"achievements"> | string
    imagePath?: StringWithAggregatesFilter<"achievements"> | string
    technologies?: StringNullableListFilter<"achievements">
    createdAt?: DateTimeWithAggregatesFilter<"achievements"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"achievements"> | Date | string
  }

  export type projectsCreateInput = {
    id?: string
    title: string
    description: string
    detailedDescription?: string | null
    tags?: projectsCreatetagsInput | string[]
    technologies?: projectsCreatetechnologiesInput | string[]
    features?: projectsCreatefeaturesInput | string[]
    imageUrl: string
    imagePath: string
    liveUrl?: string | null
    githubUrl: string
    completionDate?: string | null
    teamSize?: string | null
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category: categoriesCreateNestedOneWithoutProjectInput
  }

  export type projectsUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    detailedDescription?: string | null
    categoryId: string
    tags?: projectsCreatetagsInput | string[]
    technologies?: projectsCreatetechnologiesInput | string[]
    features?: projectsCreatefeaturesInput | string[]
    imageUrl: string
    imagePath: string
    liveUrl?: string | null
    githubUrl: string
    completionDate?: string | null
    teamSize?: string | null
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type projectsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: categoriesUpdateOneRequiredWithoutProjectNestedInput
  }

  export type projectsUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsCreateManyInput = {
    id?: string
    title: string
    description: string
    detailedDescription?: string | null
    categoryId: string
    tags?: projectsCreatetagsInput | string[]
    technologies?: projectsCreatetechnologiesInput | string[]
    features?: projectsCreatefeaturesInput | string[]
    imageUrl: string
    imagePath: string
    liveUrl?: string | null
    githubUrl: string
    completionDate?: string | null
    teamSize?: string | null
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type projectsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoriesCreateInput = {
    id?: string
    name: string
    description: string
    project?: projectsCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    project?: projectsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoriesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    project?: projectsUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    project?: projectsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoriesCreateManyInput = {
    id?: string
    name: string
    description: string
  }

  export type categoriesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type categoriesUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type adminsCreateInput = {
    id?: string
    name: string
    email: string
    password: string
  }

  export type adminsUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
  }

  export type adminsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type adminsUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type adminsCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
  }

  export type adminsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type adminsUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type educationsCreateInput = {
    id?: string
    institution: string
    degree: string
    period: string
    location: string
    description: string
    detailedDescription?: string | null
    gpa: string
    courses?: educationsCreatecoursesInput | string[]
    imageUrl: string
    imagePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type educationsUncheckedCreateInput = {
    id?: string
    institution: string
    degree: string
    period: string
    location: string
    description: string
    detailedDescription?: string | null
    gpa: string
    courses?: educationsCreatecoursesInput | string[]
    imageUrl: string
    imagePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type educationsUpdateInput = {
    institution?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    gpa?: StringFieldUpdateOperationsInput | string
    courses?: educationsUpdatecoursesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type educationsUncheckedUpdateInput = {
    institution?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    gpa?: StringFieldUpdateOperationsInput | string
    courses?: educationsUpdatecoursesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type educationsCreateManyInput = {
    id?: string
    institution: string
    degree: string
    period: string
    location: string
    description: string
    detailedDescription?: string | null
    gpa: string
    courses?: educationsCreatecoursesInput | string[]
    imageUrl: string
    imagePath: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type educationsUpdateManyMutationInput = {
    institution?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    gpa?: StringFieldUpdateOperationsInput | string
    courses?: educationsUpdatecoursesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type educationsUncheckedUpdateManyInput = {
    institution?: StringFieldUpdateOperationsInput | string
    degree?: StringFieldUpdateOperationsInput | string
    period?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    gpa?: StringFieldUpdateOperationsInput | string
    courses?: educationsUpdatecoursesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type achievementsCreateInput = {
    id?: string
    title: string
    organization: string
    year: string
    description: string
    detailedDescription?: string | null
    imageUrl: string
    imagePath: string
    technologies?: achievementsCreatetechnologiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type achievementsUncheckedCreateInput = {
    id?: string
    title: string
    organization: string
    year: string
    description: string
    detailedDescription?: string | null
    imageUrl: string
    imagePath: string
    technologies?: achievementsCreatetechnologiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type achievementsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    technologies?: achievementsUpdatetechnologiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type achievementsUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    technologies?: achievementsUpdatetechnologiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type achievementsCreateManyInput = {
    id?: string
    title: string
    organization: string
    year: string
    description: string
    detailedDescription?: string | null
    imageUrl: string
    imagePath: string
    technologies?: achievementsCreatetechnologiesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type achievementsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    technologies?: achievementsUpdatetechnologiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type achievementsUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    organization?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    technologies?: achievementsUpdatetechnologiesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CategoriesScalarRelationFilter = {
    is?: categoriesWhereInput
    isNot?: categoriesWhereInput
  }

  export type projectsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    categoryId?: SortOrder
    tags?: SortOrder
    technologies?: SortOrder
    features?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    completionDate?: SortOrder
    teamSize?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type projectsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    categoryId?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    completionDate?: SortOrder
    teamSize?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type projectsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    categoryId?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    liveUrl?: SortOrder
    githubUrl?: SortOrder
    completionDate?: SortOrder
    teamSize?: SortOrder
    featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectsListRelationFilter = {
    every?: projectsWhereInput
    some?: projectsWhereInput
    none?: projectsWhereInput
  }

  export type projectsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type adminsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type adminsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type adminsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type educationsCountOrderByAggregateInput = {
    id?: SortOrder
    institution?: SortOrder
    degree?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    gpa?: SortOrder
    courses?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type educationsMaxOrderByAggregateInput = {
    id?: SortOrder
    institution?: SortOrder
    degree?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    gpa?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type educationsMinOrderByAggregateInput = {
    id?: SortOrder
    institution?: SortOrder
    degree?: SortOrder
    period?: SortOrder
    location?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    gpa?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type achievementsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    year?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    technologies?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type achievementsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    year?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type achievementsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    organization?: SortOrder
    year?: SortOrder
    description?: SortOrder
    detailedDescription?: SortOrder
    imageUrl?: SortOrder
    imagePath?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type projectsCreatetagsInput = {
    set: string[]
  }

  export type projectsCreatetechnologiesInput = {
    set: string[]
  }

  export type projectsCreatefeaturesInput = {
    set: string[]
  }

  export type categoriesCreateNestedOneWithoutProjectInput = {
    create?: XOR<categoriesCreateWithoutProjectInput, categoriesUncheckedCreateWithoutProjectInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutProjectInput
    connect?: categoriesWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type projectsUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type projectsUpdatetechnologiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type projectsUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type categoriesUpdateOneRequiredWithoutProjectNestedInput = {
    create?: XOR<categoriesCreateWithoutProjectInput, categoriesUncheckedCreateWithoutProjectInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutProjectInput
    upsert?: categoriesUpsertWithoutProjectInput
    connect?: categoriesWhereUniqueInput
    update?: XOR<XOR<categoriesUpdateToOneWithWhereWithoutProjectInput, categoriesUpdateWithoutProjectInput>, categoriesUncheckedUpdateWithoutProjectInput>
  }

  export type projectsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<projectsCreateWithoutCategoryInput, projectsUncheckedCreateWithoutCategoryInput> | projectsCreateWithoutCategoryInput[] | projectsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCategoryInput | projectsCreateOrConnectWithoutCategoryInput[]
    createMany?: projectsCreateManyCategoryInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type projectsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<projectsCreateWithoutCategoryInput, projectsUncheckedCreateWithoutCategoryInput> | projectsCreateWithoutCategoryInput[] | projectsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCategoryInput | projectsCreateOrConnectWithoutCategoryInput[]
    createMany?: projectsCreateManyCategoryInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type projectsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<projectsCreateWithoutCategoryInput, projectsUncheckedCreateWithoutCategoryInput> | projectsCreateWithoutCategoryInput[] | projectsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCategoryInput | projectsCreateOrConnectWithoutCategoryInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutCategoryInput | projectsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: projectsCreateManyCategoryInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutCategoryInput | projectsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutCategoryInput | projectsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type projectsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<projectsCreateWithoutCategoryInput, projectsUncheckedCreateWithoutCategoryInput> | projectsCreateWithoutCategoryInput[] | projectsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutCategoryInput | projectsCreateOrConnectWithoutCategoryInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutCategoryInput | projectsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: projectsCreateManyCategoryInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutCategoryInput | projectsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutCategoryInput | projectsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type educationsCreatecoursesInput = {
    set: string[]
  }

  export type educationsUpdatecoursesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type achievementsCreatetechnologiesInput = {
    set: string[]
  }

  export type achievementsUpdatetechnologiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type categoriesCreateWithoutProjectInput = {
    id?: string
    name: string
    description: string
  }

  export type categoriesUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    description: string
  }

  export type categoriesCreateOrConnectWithoutProjectInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutProjectInput, categoriesUncheckedCreateWithoutProjectInput>
  }

  export type categoriesUpsertWithoutProjectInput = {
    update: XOR<categoriesUpdateWithoutProjectInput, categoriesUncheckedUpdateWithoutProjectInput>
    create: XOR<categoriesCreateWithoutProjectInput, categoriesUncheckedCreateWithoutProjectInput>
    where?: categoriesWhereInput
  }

  export type categoriesUpdateToOneWithWhereWithoutProjectInput = {
    where?: categoriesWhereInput
    data: XOR<categoriesUpdateWithoutProjectInput, categoriesUncheckedUpdateWithoutProjectInput>
  }

  export type categoriesUpdateWithoutProjectInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type categoriesUncheckedUpdateWithoutProjectInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type projectsCreateWithoutCategoryInput = {
    id?: string
    title: string
    description: string
    detailedDescription?: string | null
    tags?: projectsCreatetagsInput | string[]
    technologies?: projectsCreatetechnologiesInput | string[]
    features?: projectsCreatefeaturesInput | string[]
    imageUrl: string
    imagePath: string
    liveUrl?: string | null
    githubUrl: string
    completionDate?: string | null
    teamSize?: string | null
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type projectsUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    description: string
    detailedDescription?: string | null
    tags?: projectsCreatetagsInput | string[]
    technologies?: projectsCreatetechnologiesInput | string[]
    features?: projectsCreatefeaturesInput | string[]
    imageUrl: string
    imagePath: string
    liveUrl?: string | null
    githubUrl: string
    completionDate?: string | null
    teamSize?: string | null
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type projectsCreateOrConnectWithoutCategoryInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutCategoryInput, projectsUncheckedCreateWithoutCategoryInput>
  }

  export type projectsCreateManyCategoryInputEnvelope = {
    data: projectsCreateManyCategoryInput | projectsCreateManyCategoryInput[]
  }

  export type projectsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: projectsWhereUniqueInput
    update: XOR<projectsUpdateWithoutCategoryInput, projectsUncheckedUpdateWithoutCategoryInput>
    create: XOR<projectsCreateWithoutCategoryInput, projectsUncheckedCreateWithoutCategoryInput>
  }

  export type projectsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: projectsWhereUniqueInput
    data: XOR<projectsUpdateWithoutCategoryInput, projectsUncheckedUpdateWithoutCategoryInput>
  }

  export type projectsUpdateManyWithWhereWithoutCategoryInput = {
    where: projectsScalarWhereInput
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type projectsScalarWhereInput = {
    AND?: projectsScalarWhereInput | projectsScalarWhereInput[]
    OR?: projectsScalarWhereInput[]
    NOT?: projectsScalarWhereInput | projectsScalarWhereInput[]
    id?: StringFilter<"projects"> | string
    title?: StringFilter<"projects"> | string
    description?: StringFilter<"projects"> | string
    detailedDescription?: StringNullableFilter<"projects"> | string | null
    categoryId?: StringFilter<"projects"> | string
    tags?: StringNullableListFilter<"projects">
    technologies?: StringNullableListFilter<"projects">
    features?: StringNullableListFilter<"projects">
    imageUrl?: StringFilter<"projects"> | string
    imagePath?: StringFilter<"projects"> | string
    liveUrl?: StringNullableFilter<"projects"> | string | null
    githubUrl?: StringFilter<"projects"> | string
    completionDate?: StringNullableFilter<"projects"> | string | null
    teamSize?: StringNullableFilter<"projects"> | string | null
    featured?: BoolFilter<"projects"> | boolean
    createdAt?: DateTimeFilter<"projects"> | Date | string
    updatedAt?: DateTimeFilter<"projects"> | Date | string
  }

  export type projectsCreateManyCategoryInput = {
    id?: string
    title: string
    description: string
    detailedDescription?: string | null
    tags?: projectsCreatetagsInput | string[]
    technologies?: projectsCreatetechnologiesInput | string[]
    features?: projectsCreatefeaturesInput | string[]
    imageUrl: string
    imagePath: string
    liveUrl?: string | null
    githubUrl: string
    completionDate?: string | null
    teamSize?: string | null
    featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type projectsUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUncheckedUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type projectsUncheckedUpdateManyWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    detailedDescription?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: projectsUpdatetagsInput | string[]
    technologies?: projectsUpdatetechnologiesInput | string[]
    features?: projectsUpdatefeaturesInput | string[]
    imageUrl?: StringFieldUpdateOperationsInput | string
    imagePath?: StringFieldUpdateOperationsInput | string
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: StringFieldUpdateOperationsInput | string
    completionDate?: NullableStringFieldUpdateOperationsInput | string | null
    teamSize?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}