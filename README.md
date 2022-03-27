## API
### GET
```
localhost:3000/contacts
```

### POST
```
localhost:3000/contacts
// param
name: string
detail: string
age: number
```

## 코드 이해
참고 블로그 : https://velog.io/@apjammanbo/NestJS-DB%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0Postgresql-typeorm

### nest 명령어
#### nest generate, nest g

schematic 참고 : https://docs.nestjs.com/cli/usages#nest-generate
```
nest generate <schematic> <name> [options]
nest g <schematic> <name> [options]
```
위 명령어로 생성 시, app.module.ts에 자동으로 추가가 되는 듯 하다.
ex.
```
nest g co contacts
```
- 위 코드를 터미널에 입력 시, contacts/contacts.controller.ts가 생성되고 app.module.ts에 자동으로 연결 됨.
- schematicd을 바꿔가면서 서비스(s), 모듈(mo)등을 생성.

### TypeOrm 
- ORM(Object-relational mapping): 객체지향 프로그래밍과 관계형 DB 사이의 호환되지 않는 데이터를 변환하는 시스템
- 객체지향 프로그래밍은 Class, 관계형DB는 Table 사용
- typeorm에 연결하기 위해선 app.module.ts에서 typeorm module을 import 해야함.

### contacts
#### contacts.module.ts
- contacts 모듈에 controller(컨트롤러)와 provider(서비스)로 종속성 추가

### DB연결
#### typeorm과 pg(postgres)를 설치
```
npm install @nestjs/typeorm typeorm pg
```

#### 프로젝트 루트에 ormconfig.json을 생성해서 DB설정 값 입력.
```
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "TestDB",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true
}
```
- entities 경로가 dist로 되어있는데 `npm run start:dev`를 하면 dist가 생성되지 않아서 `npm run start`를 사용함.

#### app.module.ts에 DB연결 코드 추가
```
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRoot(), ContactsModule],
})
export class AppModule {}
```
- imports에 `TypeOrmModule.forRoot()` 추가

### Entity 모델링
#### contacts/entities/contact.entity.ts 생성
- [contact.entity.ts](./src/contacts/entities/contact.entity.ts)
- 실체, 객체라는 의미인데 위 파일 기준으로는 contact의 엔티티는 id, name, detail, age로 이루어져 있다? 라는 걸 알려주는 듯함.
- 엔티티가 작성되었다면 모듈에서 import를 해야함.
[contacts.module.ts](./src/contacts/contacts.module.ts)의 imports부분의 `TypeOrmModule.forFeature([Contact])`
- Entity를 생성하고 모듈에 연결하면 Entity와 DB가 매핑되어 Entity를 생성, 수정, 삭제를 할 수 있음.

### contacts 서비스 구현
- [contacts.service.ts](./src/contacts/contacts.service.ts)
- 서비스 생성이 완료되었다면 컨트롤러도 수정이 필요함. [contacts.controller.ts](./src/contacts/contacts.controller.ts) (Get, Post, Put, Delete)

### 확인
서버를 키고(npm run start) Insomnia에서 확인이 가능하다.
Postico에서는 DB를 확인할 수 있다.