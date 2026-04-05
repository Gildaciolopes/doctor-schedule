import { NextResponse } from "next/server";

const spec = {
  openapi: "3.0.0",
  info: {
    title: "Doutor Agenda API",
    description:
      "API do sistema de agendamento médico. A maioria dos endpoints protegidos exige um cookie de sessão obtido via autenticação.",
    version: "0.1.0",
    contact: {
      name: "Doutor Agenda",
    },
  },
  servers: [
    {
      url: "",
      description: "Servidor atual",
    },
  ],
  components: {
    securitySchemes: {
      sessionCookie: {
        type: "apiKey",
        in: "cookie",
        name: "better-auth.session_token",
        description:
          "Cookie de sessão retornado após autenticação via sign-in ou OAuth.",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: { type: "string", example: "Unauthorized" },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", example: "user_abc123" },
          name: { type: "string", example: "Dr. João Silva" },
          email: {
            type: "string",
            format: "email",
            example: "joao@clinica.com",
          },
          emailVerified: { type: "boolean", example: true },
          image: {
            type: "string",
            nullable: true,
            example: "https://example.com/avatar.png",
          },
          plan: {
            type: "string",
            nullable: true,
            enum: ["essential", null],
            example: "essential",
          },
          isDemoUser: { type: "boolean", example: false },
          demoTrialEndsAt: {
            type: "string",
            format: "date-time",
            nullable: true,
            example: "2026-05-05T00:00:00.000Z",
          },
          stripeCustomerId: {
            type: "string",
            nullable: true,
            example: "cus_abc123",
          },
          stripeSubscriptionId: {
            type: "string",
            nullable: true,
            example: "sub_abc123",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-01T00:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
          clinic: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
              name: { type: "string", example: "Clínica São Lucas" },
            },
          },
        },
      },
      Session: {
        type: "object",
        properties: {
          id: { type: "string", example: "sess_abc123" },
          userId: { type: "string", example: "user_abc123" },
          token: { type: "string", example: "token_xyz" },
          expiresAt: {
            type: "string",
            format: "date-time",
            example: "2026-05-05T00:00:00.000Z",
          },
          ipAddress: {
            type: "string",
            nullable: true,
            example: "192.168.0.1",
          },
          userAgent: {
            type: "string",
            nullable: true,
            example: "Mozilla/5.0 ...",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
        },
      },
      Doctor: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440001",
          },
          clinicId: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          name: { type: "string", example: "Dra. Maria Oliveira" },
          specialty: { type: "string", example: "Cardiologia" },
          avatarImageUrl: {
            type: "string",
            nullable: true,
            example: "https://example.com/avatar.png",
          },
          appointmentPriceInCents: {
            type: "integer",
            example: 25000,
            description: "Preço da consulta em centavos (ex: 25000 = R$250,00)",
          },
          availableFromWeekDay: {
            type: "integer",
            minimum: 0,
            maximum: 6,
            example: 1,
            description: "0 = domingo, 1 = segunda, ..., 6 = sábado",
          },
          availableToWeekDay: {
            type: "integer",
            minimum: 0,
            maximum: 6,
            example: 5,
          },
          availableFromTime: {
            type: "string",
            example: "08:00:00",
            description: "Horário de início da disponibilidade (HH:mm:ss)",
          },
          availableToTime: {
            type: "string",
            example: "18:00:00",
            description: "Horário de fim da disponibilidade (HH:mm:ss)",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-01T00:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
        },
      },
      Patient: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440002",
          },
          clinicId: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          name: { type: "string", example: "Carlos Souza" },
          email: {
            type: "string",
            format: "email",
            example: "carlos@email.com",
          },
          phoneNumber: { type: "string", example: "11999999999" },
          sex: {
            type: "string",
            enum: ["male", "female"],
            example: "male",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-01-01T00:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
        },
      },
      Appointment: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440003",
          },
          clinicId: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
          patientId: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440002",
          },
          doctorId: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440001",
          },
          date: {
            type: "string",
            format: "date-time",
            example: "2026-04-10T14:00:00.000Z",
          },
          appointmentPriceInCents: {
            type: "integer",
            example: 25000,
            description: "Preço em centavos no momento do agendamento",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-04-01T00:00:00.000Z",
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/sign-up/email": {
      post: {
        tags: ["Autenticação"],
        summary: "Cadastro com e-mail e senha",
        description:
          "Cria uma nova conta de usuário com e-mail e senha. Após o cadastro, o usuário já estará autenticado.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Dr. João Silva" },
                  email: {
                    type: "string",
                    format: "email",
                    example: "joao@clinica.com",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    example: "senhaSegura123",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Cadastro realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "token_xyz" },
                    user: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "422": {
            description: "E-mail já cadastrado ou dados inválidos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/sign-in/email": {
      post: {
        tags: ["Autenticação"],
        summary: "Login com e-mail e senha",
        description:
          "Autentica o usuário com e-mail e senha. Retorna um token de sessão e define um cookie de sessão.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "joao@clinica.com",
                  },
                  password: {
                    type: "string",
                    example: "senhaSegura123",
                  },
                  rememberMe: {
                    type: "boolean",
                    example: true,
                    description: "Se true, a sessão terá duração estendida",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "token_xyz" },
                    user: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Credenciais inválidas",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/sign-out": {
      post: {
        tags: ["Autenticação"],
        summary: "Logout",
        description:
          "Encerra a sessão atual do usuário e invalida o cookie de sessão.",
        security: [{ sessionCookie: [] }],
        responses: {
          "200": {
            description: "Logout realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/get-session": {
      get: {
        tags: ["Autenticação"],
        summary: "Obter sessão atual",
        description:
          "Retorna os dados da sessão e do usuário autenticado, incluindo clínica vinculada, plano e status de demonstração.",
        security: [{ sessionCookie: [] }],
        responses: {
          "200": {
            description: "Sessão ativa",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    session: { $ref: "#/components/schemas/Session" },
                    user: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Não autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/sign-in/social": {
      get: {
        tags: ["Autenticação"],
        summary: "Login social (Google OAuth)",
        description:
          "Redireciona o usuário para a página de autenticação do provedor OAuth (Google). Após autenticação, o provedor redireciona de volta para o `callbackURL` informado.",
        parameters: [
          {
            name: "provider",
            in: "query",
            required: true,
            schema: {
              type: "string",
              enum: ["google"],
              example: "google",
            },
            description: "Provedor OAuth",
          },
          {
            name: "callbackURL",
            in: "query",
            required: false,
            schema: {
              type: "string",
              example: "/dashboard",
            },
            description:
              "URL de redirecionamento após autenticação bem-sucedida",
          },
        ],
        responses: {
          "302": {
            description: "Redirecionamento para o provedor OAuth",
          },
        },
      },
    },
    "/api/activate-demo": {
      get: {
        tags: ["Demonstração"],
        summary: "Ativar período de demonstração (callback OAuth)",
        description:
          "Callback chamado após login via Google OAuth com parâmetro `demo=true`. Ativa o período de trial de 30 dias para o usuário, define `isDemoUser=true` e redireciona para `/dashboard`. Não deve ser chamado diretamente.",
        security: [{ sessionCookie: [] }],
        responses: {
          "302": {
            description:
              "Redirecionamento para `/dashboard` (sucesso) ou `/authentication?demo=true` (falha)",
          },
        },
      },
    },
    "/api/auth/update-demo-status": {
      post: {
        tags: ["Demonstração"],
        summary: "Atualizar status de demonstração do usuário",
        description:
          "Ativa ou desativa o modo demonstração para o usuário autenticado. Ao ativar, define `demoTrialEndsAt` como 30 dias a partir de agora. Também limpa o cache do cookie de sessão para forçar releitura dos dados atualizados.",
        security: [{ sessionCookie: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["isDemoUser"],
                properties: {
                  isDemoUser: {
                    type: "boolean",
                    example: true,
                    description: "true para ativar trial, false para desativar",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Status atualizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "401": {
            description: "Não autenticado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Erro interno ao atualizar o status",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/export/{entity}": {
      get: {
        tags: ["Exportação"],
        summary: "Exportar dados da clínica",
        description:
          "Exporta dados de médicos, pacientes ou consultas da clínica do usuário autenticado no formato Excel (.xlsx) ou PDF. O arquivo é retornado como download com o nome `{entity}-{YYYY-MM-DD}.{extensão}`.",
        security: [{ sessionCookie: [] }],
        parameters: [
          {
            name: "entity",
            in: "path",
            required: true,
            schema: {
              type: "string",
              enum: ["doctors", "patients", "appointments"],
            },
            description: "Entidade a ser exportada",
          },
          {
            name: "format",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["excel", "pdf"],
              default: "excel",
            },
            description: "Formato do arquivo exportado",
          },
        ],
        responses: {
          "200": {
            description: "Arquivo gerado com sucesso",
            headers: {
              "Content-Disposition": {
                schema: {
                  type: "string",
                  example: 'attachment; filename="doctors-2026-04-05.xlsx"',
                },
              },
              "Content-Type": {
                schema: {
                  type: "string",
                  example:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
              },
            },
            content: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                {
                  schema: {
                    type: "string",
                    format: "binary",
                    description: "Arquivo Excel (.xlsx)",
                  },
                },
              "application/pdf": {
                schema: {
                  type: "string",
                  format: "binary",
                  description: "Arquivo PDF",
                },
              },
            },
          },
          "400": {
            description: "Entidade ou formato inválido",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "401": {
            description: "Não autenticado ou sem clínica vinculada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "500": {
            description: "Erro ao gerar o arquivo",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/stripe/webhook": {
      post: {
        tags: ["Stripe"],
        summary: "Webhook do Stripe",
        description:
          "Endpoint exclusivo para eventos do Stripe. Valida a assinatura do webhook e processa eventos de pagamento e cancelamento de assinatura.\n\n**Eventos tratados:**\n- `invoice.payment_succeeded` — ativa o plano `essential` e salva os IDs do Stripe no usuário\n- `customer.subscription.deleted` — cancela a assinatura e limpa os dados do Stripe",
        parameters: [
          {
            name: "stripe-signature",
            in: "header",
            required: true,
            schema: { type: "string" },
            description:
              "Assinatura do webhook gerada pelo Stripe para validação",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                description: "Payload do evento Stripe (raw body)",
                properties: {
                  id: {
                    type: "string",
                    example: "evt_1234567890",
                  },
                  type: {
                    type: "string",
                    example: "invoice.payment_succeeded",
                  },
                  data: {
                    type: "object",
                    description: "Dados do evento",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Evento processado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    received: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          "500": {
            description:
              "Falha na validação da assinatura ou erro de processamento",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Autenticação",
      description:
        "Endpoints de autenticação gerenciados pelo better-auth (e-mail/senha e Google OAuth)",
    },
    {
      name: "Demonstração",
      description: "Endpoints para gerenciar o período de trial/demonstração",
    },
    {
      name: "Exportação",
      description: "Exportação de dados da clínica em formatos Excel e PDF",
    },
    {
      name: "Stripe",
      description:
        "Webhook para integração com o Stripe (uso interno — chamado pelo Stripe)",
    },
  ],
};

export async function GET() {
  return NextResponse.json(spec);
}
