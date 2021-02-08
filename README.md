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

4- User `npm start` in all 3 project to start development servers. 

5- Navigate to `http://localhost:4200/` 


## Test
Run `npm run test` in `OrdersApp` and `PaymentsApp`


## Build
Run `npm run build`



