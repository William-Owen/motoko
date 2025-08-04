import { describe, expect, it } from "vitest"
import formatNumber from "./"

describe("formatNumber", () => {
	describe("pretty", () => {
		it("formats millions correctly", () => {
			expect(formatNumber.pretty(1000000)).toBe("1.0m")
			expect(formatNumber.pretty(2500000)).toBe("2.5m")
			expect(formatNumber.pretty(10000000)).toBe("10.0m")
		})

		it("formats thousands correctly", () => {
			expect(formatNumber.pretty(1000)).toBe("1.0k")
			expect(formatNumber.pretty(2500)).toBe("2.5k")
			expect(formatNumber.pretty(999999)).toBe("1000.0k")
		})

		it("formats numbers under 1000 as-is", () => {
			expect(formatNumber.pretty(999)).toBe("999")
			expect(formatNumber.pretty(100)).toBe("100")
			expect(formatNumber.pretty(0)).toBe("0")
		})

		it("applies fixed decimal places when provided", () => {
			expect(formatNumber.pretty(123, 2)).toBe("123.00")
			expect(formatNumber.pretty(123, 0)).toBe("123")
			expect(formatNumber.pretty(123, null)).toBe("123")
		})
	})

	describe("international", () => {
		it("formats numbers with locale-specific separators", () => {
			expect(formatNumber.international(1000)).toBe("1,000")
			expect(formatNumber.international(1000000)).toBe("1,000,000")
			expect(formatNumber.international(123456789)).toBe("123,456,789")
		})

		it("handles small numbers", () => {
			expect(formatNumber.international(100)).toBe("100")
			expect(formatNumber.international(0)).toBe("0")
		})
	})

	describe("fileSize", () => {
		it("formats bytes correctly", () => {
			expect(formatNumber.fileSize(0)).toBe("0 Bytes")
			expect(formatNumber.fileSize(512)).toBe("512 Bytes")
			expect(formatNumber.fileSize(1023)).toBe("1023 Bytes")
		})

		it("formats KB correctly", () => {
			expect(formatNumber.fileSize(1024)).toBe("1 KB")
			expect(formatNumber.fileSize(2048)).toBe("2 KB")
			expect(formatNumber.fileSize(1536)).toBe("1.5 KB")
		})

		it("formats MB correctly", () => {
			expect(formatNumber.fileSize(1048576)).toBe("1 MB")
			expect(formatNumber.fileSize(2097152)).toBe("2 MB")
			expect(formatNumber.fileSize(1572864)).toBe("1.5 MB")
		})

		it("formats GB correctly", () => {
			expect(formatNumber.fileSize(1073741824)).toBe("1 GB")
			expect(formatNumber.fileSize(2147483648)).toBe("2 GB")
			expect(formatNumber.fileSize(1610612736)).toBe("1.5 GB")
		})

		it("formats TB correctly", () => {
			expect(formatNumber.fileSize(1099511627776n)).toBe("1 TB")
			expect(formatNumber.fileSize(2199023255552n)).toBe("2 TB")
			expect(formatNumber.fileSize(1649267441664n)).toBe("1.5 TB")
		})

		it("formats PB correctly", () => {
			expect(formatNumber.fileSize(1125899906842624n)).toBe("1 PB")
			expect(formatNumber.fileSize(2251799813685248n)).toBe("2 PB")
			expect(formatNumber.fileSize(1688849860263936n)).toBe("1.5 PB")
		})

		it("formats EB correctly", () => {
			expect(formatNumber.fileSize(1152921504606846976n)).toBe("1 EB")
			expect(formatNumber.fileSize(2305843009213693952n)).toBe("2 EB")
			expect(formatNumber.fileSize(1729382256910270464n)).toBe("1.5 EB")
		})

		it("formats ZB correctly", () => {
			expect(formatNumber.fileSize(1180591620717411303424n)).toBe("1 ZB")
			expect(formatNumber.fileSize(2361183241434822606848n)).toBe("2 ZB")
			expect(formatNumber.fileSize(1770887931076116955136n)).toBe("1.5 ZB")
		})

		it("formats YB correctly", () => {
			expect(formatNumber.fileSize(1208925819614629174706176n)).toBe("1 YB")
			expect(formatNumber.fileSize(2417851639229258349412352n)).toBe("2 YB")
			expect(formatNumber.fileSize(1813388729460943762059264n)).toBe("1.5 YB")
		})

		it("accepts string input", () => {
			expect(formatNumber.fileSize("1024")).toBe("1 KB")
			expect(formatNumber.fileSize("1048576")).toBe("1 MB")
		})

		it("returns value only when type is 'valueOnly'", () => {
			expect(formatNumber.fileSize(1024, "valueOnly")).toBe("1")
			expect(formatNumber.fileSize(1536, "valueOnly")).toBe("1.5")
		})

		it("returns unit only when type is 'unitOnly'", () => {
			expect(formatNumber.fileSize(1024, "unitOnly")).toBe("KB")
			expect(formatNumber.fileSize(1048576, "unitOnly")).toBe("MB")
			expect(formatNumber.fileSize(1813388729460943762059264n, "unitOnly")).toBe("YB")
		})

		it("returns full format by default", () => {
			expect(formatNumber.fileSize(1024, "full")).toBe("1 KB")
			expect(formatNumber.fileSize(1024)).toBe("1 KB")
		})
	})

	describe("bytesAngCostPerMonthGbToCostPerMonth", () => {
		it("calculates cost correctly", () => {
			const gbInBytes = 1024 * 1024 * 1024
			expect(formatNumber.bytesAngCostPerMonthGbToCostPerMonth(gbInBytes, 0.1)).toBe("$0.10")
			expect(formatNumber.bytesAngCostPerMonthGbToCostPerMonth(gbInBytes * 2, 0.1)).toBe("$0.20")
		})

		it("accepts string input", () => {
			const gbInBytes = 1024 * 1024 * 1024
			expect(formatNumber.bytesAngCostPerMonthGbToCostPerMonth(gbInBytes.toString(), 0.1)).toBe("$0.10")
		})

		it("handles fractional costs", () => {
			const halfGbInBytes = (1024 * 1024 * 1024) / 2
			expect(formatNumber.bytesAngCostPerMonthGbToCostPerMonth(halfGbInBytes, 0.1)).toBe("$0.05")
		})
	})

	describe("percentage", () => {
		it("formats percentages correctly", () => {
			expect(formatNumber.percentage(50)).toBe("50.0%")
			expect(formatNumber.percentage(75.5)).toBe("75.5%")
			expect(formatNumber.percentage(100)).toBe("100.0%")
		})

		it("handles zero and falsy values", () => {
			expect(formatNumber.percentage(0)).toBe("0%")
			expect(formatNumber.percentage(Number.NaN)).toBe("0%")
		})

		it("handles decimal values", () => {
			expect(formatNumber.percentage(33.333)).toBe("33.3%")
			expect(formatNumber.percentage(0.1)).toBe("0.1%")
		})
	})

	describe("currency", () => {
		it("formats currency correctly", () => {
			expect(formatNumber.currency(100)).toBe("$100.00")
			expect(formatNumber.currency(1234.56)).toBe("$1,234.56")
			expect(formatNumber.currency(0)).toBe("$0.00")
		})

		it("handles decimal amounts", () => {
			expect(formatNumber.currency(99.99)).toBe("$99.99")
			expect(formatNumber.currency(10.5)).toBe("$10.50")
		})

		it("handles large amounts", () => {
			expect(formatNumber.currency(1000000)).toBe("$1,000,000.00")
		})

		it("handles negative amounts", () => {
			expect(formatNumber.currency(-100)).toBe("-$100.00")
		})
	})
})
