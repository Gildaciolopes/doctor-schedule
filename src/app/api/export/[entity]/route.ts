import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import ExcelJS from "exceljs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/currency";
import { auth } from "@/lib/auth";

dayjs.extend(utc);
dayjs.extend(timezone);

const WEEKDAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

// ─── Excel ───────────────────────────────────────────────────────────────────

function styleHeader(sheet: ExcelJS.Worksheet, cols: number) {
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E293B" },
  };
  headerRow.alignment = { vertical: "middle", horizontal: "left" };
  headerRow.height = 28;

  for (let i = 1; i <= cols; i++) {
    const cell = headerRow.getCell(i);
    cell.border = {
      bottom: { style: "thin", color: { argb: "FF334155" } },
    };
  }
  sheet.views = [{ state: "frozen", ySplit: 1 }];
}

function styleDataRows(sheet: ExcelJS.Worksheet, rows: number) {
  for (let r = 2; r <= rows + 1; r++) {
    const row = sheet.getRow(r);
    row.height = 22;
    if (r % 2 === 0) {
      for (let c = 1; c <= sheet.columnCount; c++) {
        row.getCell(c).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF8FAFC" },
        };
      }
    }
  }
}

async function buildDoctorsExcel(clinicId: string): Promise<Buffer> {
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, clinicId),
  });

  const wb = new ExcelJS.Workbook();
  wb.creator = "dr.schedule";
  wb.created = new Date();
  const ws = wb.addWorksheet("Médicos");

  ws.columns = [
    { header: "Nome", key: "name", width: 28 },
    { header: "Especialidade", key: "specialty", width: 24 },
    { header: "Dias disponíveis", key: "days", width: 26 },
    { header: "Horário", key: "time", width: 20 },
    { header: "Valor da consulta", key: "price", width: 20 },
  ];

  doctors.forEach((d) => {
    ws.addRow({
      name: d.name,
      specialty: d.specialty,
      days: `${WEEKDAYS[d.availableFromWeekDay]} a ${WEEKDAYS[d.availableToWeekDay]}`,
      time: `${d.availableFromTime.slice(0, 5)} – ${d.availableToTime.slice(0, 5)}`,
      price: formatCurrencyInCents(d.appointmentPriceInCents),
    });
  });

  styleHeader(ws, 5);
  styleDataRows(ws, doctors.length);

  return wb.xlsx.writeBuffer() as unknown as Promise<Buffer>;
}

async function buildPatientsExcel(clinicId: string): Promise<Buffer> {
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, clinicId),
  });

  const wb = new ExcelJS.Workbook();
  wb.creator = "dr.schedule";
  wb.created = new Date();
  const ws = wb.addWorksheet("Pacientes");

  ws.columns = [
    { header: "Nome", key: "name", width: 28 },
    { header: "Email", key: "email", width: 32 },
    { header: "Telefone", key: "phone", width: 18 },
    { header: "Sexo", key: "sex", width: 14 },
  ];

  patients.forEach((p) => {
    ws.addRow({
      name: p.name,
      email: p.email,
      phone: p.phoneNumber,
      sex: p.sex === "male" ? "Masculino" : "Feminino",
    });
  });

  styleHeader(ws, 4);
  styleDataRows(ws, patients.length);

  return wb.xlsx.writeBuffer() as unknown as Promise<Buffer>;
}

async function buildAppointmentsExcel(clinicId: string): Promise<Buffer> {
  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.clinicId, clinicId),
    with: { patient: true, doctor: true },
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  const wb = new ExcelJS.Workbook();
  wb.creator = "dr.schedule";
  wb.created = new Date();
  const ws = wb.addWorksheet("Agendamentos");

  ws.columns = [
    { header: "Paciente", key: "patient", width: 28 },
    { header: "Médico", key: "doctor", width: 24 },
    { header: "Data e Hora", key: "date", width: 22 },
    { header: "Especialidade", key: "specialty", width: 22 },
    { header: "Valor", key: "price", width: 18 },
  ];

  appointments.forEach((a) => {
    ws.addRow({
      patient: a.patient.name,
      doctor: a.doctor.name,
      date: dayjs(a.date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm"),
      specialty: a.doctor.specialty,
      price: formatCurrencyInCents(a.appointmentPriceInCents),
    });
  });

  styleHeader(ws, 5);
  styleDataRows(ws, appointments.length);

  return wb.xlsx.writeBuffer() as unknown as Promise<Buffer>;
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

function buildPDF(
  title: string,
  columns: { label: string; width: number }[],
  rows: string[][],
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      layout: "landscape",
    });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageW = doc.page.width - 80; // margins
    const rowH = 22;
    const headerH = 30;
    const colWidths = columns.map((c) => (c.width / 100) * pageW);

    // — Title block
    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor("#1E293B")
      .text(title, 40, 40);
    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor("#64748B")
      .text(
        `Gerado em ${dayjs().tz("America/Sao_Paulo").format("DD/MM/YYYY [às] HH:mm")}`,
        40,
        65,
      );

    let y = 90;

    // — Draw table header
    const drawHeader = () => {
      doc.rect(40, y, pageW, headerH).fill("#1E293B");
      let x = 40;
      columns.forEach((col, i) => {
        doc
          .fontSize(9)
          .font("Helvetica-Bold")
          .fillColor("#FFFFFF")
          .text(col.label, x + 6, y + 9, {
            width: colWidths[i] - 8,
            ellipsis: true,
          });
        x += colWidths[i];
      });
      y += headerH;
    };

    drawHeader();

    // — Draw data rows
    rows.forEach((row, rowIdx) => {
      // Page break
      if (y + rowH > doc.page.height - 40) {
        doc.addPage();
        y = 40;
        drawHeader();
      }

      if (rowIdx % 2 === 0) {
        doc.rect(40, y, pageW, rowH).fill("#F8FAFC");
      }

      let x = 40;
      row.forEach((cell, i) => {
        doc
          .fontSize(8.5)
          .font("Helvetica")
          .fillColor("#1E293B")
          .text(cell ?? "", x + 6, y + 6, {
            width: colWidths[i] - 12,
            ellipsis: true,
          });
        x += colWidths[i];
      });

      // Row border
      doc
        .moveTo(40, y + rowH)
        .lineTo(40 + pageW, y + rowH)
        .strokeColor("#E2E8F0")
        .lineWidth(0.5)
        .stroke();

      y += rowH;
    });

    // Outer border
    doc
      .rect(40, 90, pageW, headerH + rows.length * rowH)
      .strokeColor("#CBD5E1")
      .lineWidth(1)
      .stroke();

    doc.end();
  });
}

async function buildDoctorsPDF(clinicId: string): Promise<Buffer> {
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, clinicId),
  });

  const rows = doctors.map((d) => [
    d.name,
    d.specialty,
    `${WEEKDAYS[d.availableFromWeekDay]} a ${WEEKDAYS[d.availableToWeekDay]}`,
    `${d.availableFromTime.slice(0, 5)} – ${d.availableToTime.slice(0, 5)}`,
    formatCurrencyInCents(d.appointmentPriceInCents),
  ]);

  return buildPDF(
    "Médicos",
    [
      { label: "Nome", width: 24 },
      { label: "Especialidade", width: 20 },
      { label: "Dias disponíveis", width: 22 },
      { label: "Horário", width: 18 },
      { label: "Valor da consulta", width: 16 },
    ],
    rows,
  );
}

async function buildPatientsPDF(clinicId: string): Promise<Buffer> {
  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, clinicId),
  });

  const rows = patients.map((p) => [
    p.name,
    p.email,
    p.phoneNumber,
    p.sex === "male" ? "Masculino" : "Feminino",
  ]);

  return buildPDF(
    "Pacientes",
    [
      { label: "Nome", width: 28 },
      { label: "Email", width: 34 },
      { label: "Telefone", width: 20 },
      { label: "Sexo", width: 18 },
    ],
    rows,
  );
}

async function buildAppointmentsPDF(clinicId: string): Promise<Buffer> {
  const appointments = await db.query.appointmentsTable.findMany({
    where: eq(appointmentsTable.clinicId, clinicId),
    with: { patient: true, doctor: true },
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  const rows = appointments.map((a) => [
    a.patient.name,
    a.doctor.name,
    dayjs(a.date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm"),
    a.doctor.specialty,
    formatCurrencyInCents(a.appointmentPriceInCents),
  ]);

  return buildPDF(
    "Agendamentos",
    [
      { label: "Paciente", width: 22 },
      { label: "Médico", width: 20 },
      { label: "Data e Hora", width: 18 },
      { label: "Especialidade", width: 22 },
      { label: "Valor", width: 18 },
    ],
    rows,
  );
}

// ─── Route Handler ────────────────────────────────────────────────────────────

const ENTITIES = ["doctors", "patients", "appointments"] as const;
type ValidEntity = (typeof ENTITIES)[number];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.clinic) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { entity } = await params;
  if (!ENTITIES.includes(entity as ValidEntity)) {
    return NextResponse.json({ error: "Entidade inválida" }, { status: 400 });
  }

  const format = request.nextUrl.searchParams.get("format") ?? "excel";
  if (format !== "excel" && format !== "pdf") {
    return NextResponse.json({ error: "Formato inválido" }, { status: 400 });
  }

  const clinicId = session.user.clinic.id;
  const timestamp = dayjs().tz("America/Sao_Paulo").format("YYYY-MM-DD");

  try {
    if (format === "excel") {
      let buffer: Buffer;
      let filename: string;

      if (entity === "doctors") {
        buffer = await buildDoctorsExcel(clinicId);
        filename = `medicos-${timestamp}.xlsx`;
      } else if (entity === "patients") {
        buffer = await buildPatientsExcel(clinicId);
        filename = `pacientes-${timestamp}.xlsx`;
      } else {
        buffer = await buildAppointmentsExcel(clinicId);
        filename = `agendamentos-${timestamp}.xlsx`;
      }

      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    } else {
      let buffer: Buffer;
      let filename: string;

      if (entity === "doctors") {
        buffer = await buildDoctorsPDF(clinicId);
        filename = `medicos-${timestamp}.pdf`;
      } else if (entity === "patients") {
        buffer = await buildPatientsPDF(clinicId);
        filename = `pacientes-${timestamp}.pdf`;
      } else {
        buffer = await buildAppointmentsPDF(clinicId);
        filename = `agendamentos-${timestamp}.pdf`;
      }

      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }
  } catch (error) {
    console.error("Erro ao gerar exportação:", error);
    return NextResponse.json(
      { error: "Erro ao gerar arquivo" },
      { status: 500 },
    );
  }
}
