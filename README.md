## Full-stack Engineer Practical App

## Development
In order to setup development workspace make sure you did below steps:

1-Run a SQL Server.
 - Make sure TCP/IP config is enabled(check below image)
 <img src="https://i.stack.imgur.com/7ElnG.png" width="400">


- Initial database with following query

`
CREATE TABLE [dbo].[Orders](
	[Id] [uniqueidentifier] NOT NULL,
	[CustomerName] [nvarchar](max) NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedOn] [datetime] NULL,
	[TotalQuantity] [int] NOT NULL,
	[Note] [nvarchar](max) NULL,
	[PayAmount] [decimal](9, 2) NOT NULL,
	[SellerName] [nvarchar](max) NULL,
	[State] [smallint] NOT NULL,
	[Discount] [decimal](9, 2) NOT NULL,
	[Promotion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
`

2- Change `OrdersApp\config.json` regarding your SQL configuration.


3- Install node packages for all projects (AdminPanel,OrdersApp,PaymentsApp).

4- Run `npm start` in all 3 project to start development servers. 

5- Navigate to `http://localhost:4200/` 

`Login with any user/password`

<img src="/static-assets/dashboard.PNG?raw=true" width="400" />

## Test
Run `npm run test` in `OrdersApp` and `PaymentsApp`


## Build
Run `npm run build`


## Test History
#Orders App
<pre>
 Endpoints check
    √ should return http status 200 when called : /
    √ should return http status 200 when called: orders/list (157ms)    

  MSSQL Server
    √ should connect to ms-sql server properly
    √ should find order table in datbase (55ms)

  Order Repository
    √ should insert new order to database without error (86ms)
    √ shoul inserted order value and persisted value equal (52ms)
    √ shoul update order status (117ms)

  PaymentApp Availibility
    √ should able to connect to payment app endpoint

  Order Service
    create order
      √ should insert new order
    get order
      √ should get order


  10 passing (773ms)
</pre>
<pre>
  #Payments App:
  Endpoints check
    √ should return confirmed or declined after called (70ms)

  Payment Service
    Process
      √ should randomly generate both confirmed & declined results in 10 invokes


  2 passing (130ms)
</pre>


## Infrastructure

![alt text](/static-assets/infrastructure.PNG/?raw=true)



