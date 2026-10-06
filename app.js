/**
 * Ảnh sang lưới hạt ủi MARD - Vanilla JavaScript Application
 * Hoàn toàn chạy tĩnh, hỗ trợ giao thức file:/// hoặc web server cục bộ
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DỮ LIỆU BẢNG MÀU CHUẨN MARD (221 MÃ MÀU A01 -> M15)
  // =========================================================================
  const MARD_PALETTE_RAW = [
    // Nhóm A: Vàng, Cam, Đỏ Cam (26 màu)
    { c: 'A01', h: '#FAF5CE', n: 'Vàng kem nhạt', g: 'A' },
    { c: 'A02', h: '#FCFED7', n: 'Vàng sữa', g: 'A' },
    { c: 'A03', h: '#FCFF93', n: 'Vàng sáng', g: 'A' },
    { c: 'A04', h: '#F8ED5C', n: 'Vàng chanh', g: 'A' },
    { c: 'A05', h: '#F0D838', n: 'Vàng tươi', g: 'A' },
    { c: 'A06', h: '#FDA951', n: 'Cam mơ', g: 'A' },
    { c: 'A07', h: '#FB8C50', n: 'Cam tươi', g: 'A' },
    { c: 'A08', h: '#FDD94D', n: 'Vàng chuối', g: 'A' },
    { c: 'A09', h: '#F79D5E', n: 'Cam đào đậm', g: 'A' },
    { c: 'A10', h: '#F57F37', n: 'Cam rực', g: 'A' },
    { c: 'A11', h: '#FEDB9A', n: 'Vàng be nhạt', g: 'A' },
    { c: 'A12', h: '#FDA275', n: 'Cam cá hồi', g: 'A' },
    { c: 'A13', h: '#FDC667', n: 'Vàng cam ấm', g: 'A' },
    { c: 'A14', h: '#E85742', n: 'Đỏ cam tươi', g: 'A' },
    { c: 'A15', h: '#FBF65F', n: 'Vàng neon', g: 'A' },
    { c: 'A16', h: '#FFFF99', n: 'Vàng pastel', g: 'A' },
    { c: 'A17', h: '#FDE272', n: 'Vàng hoa cúc', g: 'A' },
    { c: 'A18', h: '#FCC080', n: 'Cam sữa', g: 'A' },
    { c: 'A19', h: '#FC7E77', n: 'Cam san hô', g: 'A' },
    { c: 'A20', h: '#FAD66E', n: 'Vàng óng', g: 'A' },
    { c: 'A21', h: '#FAE392', n: 'Vàng bơ', g: 'A' },
    { c: 'A22', h: '#EDF978', n: 'Vàng chanh lục', g: 'A' },
    { c: 'A23', h: '#E2C9BD', n: 'Cam be đất', g: 'A' },
    { c: 'A24', h: '#F3F6AA', n: 'Vàng dịu', g: 'A' },
    { c: 'A25', h: '#FED785', n: 'Vàng hoàng yến', g: 'A' },
    { c: 'A26', h: '#FDC832', n: 'Vàng nghệ tây', g: 'A' },

    // Nhóm B: Xanh lá, Xanh ngọc, Rêu (32 màu)
    { c: 'B01', h: '#DEF139', n: 'Xanh lá chuối', g: 'B' },
    { c: 'B02', h: '#65F344', n: 'Xanh nõn chuối', g: 'B' },
    { c: 'B03', h: '#9FF685', n: 'Xanh lá pastel', g: 'B' },
    { c: 'B04', h: '#5FDF34', n: 'Xanh lá mạ', g: 'B' },
    { c: 'B05', h: '#39E159', n: 'Xanh lục tươi', g: 'B' },
    { c: 'B06', h: '#65E0A4', n: 'Xanh bạc hà', g: 'B' },
    { c: 'B07', h: '#3EAF7B', n: 'Xanh ngọc bích', g: 'B' },
    { c: 'B08', h: '#1C9C55', n: 'Xanh ngọc đậm', g: 'B' },
    { c: 'B09', h: '#2A5138', n: 'Xanh rêu già', g: 'B' },
    { c: 'B10', h: '#9BD0BA', n: 'Xanh ngọc nhạt', g: 'B' },
    { c: 'B11', h: '#627133', n: 'Xanh rêu bộ đội', g: 'B' },
    { c: 'B12', h: '#1B6E3D', n: 'Xanh rừng sâu', g: 'B' },
    { c: 'B13', h: '#C9E87E', n: 'Xanh lá táo non', g: 'B' },
    { c: 'B14', h: '#ADE84C', n: 'Xanh cốm tươi', g: 'B' },
    { c: 'B15', h: '#305235', n: 'Xanh thông sẫm', g: 'B' },
    { c: 'B16', h: '#C0ED9C', n: 'Xanh kiwi sữa', g: 'B' },
    { c: 'B17', h: '#9EB33F', n: 'Xanh ô liu', g: 'B' },
    { c: 'B18', h: '#E5ED4F', n: 'Xanh mạ vàng', g: 'B' },
    { c: 'B19', h: '#26B78F', n: 'Xanh ngọc lục bảo', g: 'B' },
    { c: 'B20', h: '#CBEDCF', n: 'Xanh trà sữa', g: 'B' },
    { c: 'B21', h: '#186269', n: 'Xanh mòng két', g: 'B' },
    { c: 'B22', h: '#094241', n: 'Xanh cổ vịt đậm', g: 'B' },
    { c: 'B23', h: '#343C19', n: 'Xanh rêu tối', g: 'B' },
    { c: 'B24', h: '#E8FAA7', n: 'Xanh bơ nhạt', g: 'B' },
    { c: 'B25', h: '#4E846B', n: 'Xanh ngọc trầm', g: 'B' },
    { c: 'B26', h: '#917C36', n: 'Xanh rêu ngả vàng', g: 'B' },
    { c: 'B27', h: '#D0E1AE', n: 'Xanh đậu hà lan', g: 'B' },
    { c: 'B28', h: '#9EE4BA', n: 'Xanh kem bạc hà', g: 'B' },
    { c: 'B29', h: '#C6E05F', n: 'Xanh chanh tươi', g: 'B' },
    { c: 'B30', h: '#E3FBB1', n: 'Xanh nõn sáng', g: 'B' },
    { c: 'B31', h: '#B2E694', n: 'Xanh dưa lưới', g: 'B' },
    { c: 'B32', h: '#92AD5F', n: 'Xanh rêu nhạt', g: 'B' },

    // Nhóm C: Xanh dương, Xanh biển, Da trời (29 màu)
    { c: 'C01', h: '#F0FEE5', n: 'Xanh phấn băng', g: 'C' },
    { c: 'C02', h: '#ACF8FE', n: 'Xanh da trời sáng', g: 'C' },
    { c: 'C03', h: '#9EE1F8', n: 'Xanh da trời nhạt', g: 'C' },
    { c: 'C04', h: '#44CCFC', n: 'Xanh cyan tươi', g: 'C' },
    { c: 'C05', h: '#05ABE3', n: 'Xanh biển rực', g: 'C' },
    { c: 'C06', h: '#55A7E9', n: 'Xanh hòa bình', g: 'C' },
    { c: 'C07', h: '#3A77CB', n: 'Xanh dương hoàng gia', g: 'C' },
    { c: 'C08', h: '#0F52BD', n: 'Xanh coban đậm', g: 'C' },
    { c: 'C09', h: '#334AC6', n: 'Xanh tím than sáng', g: 'C' },
    { c: 'C10', h: '#3CBCE2', n: 'Xanh ngọc lam biển', g: 'C' },
    { c: 'C11', h: '#2ADDD3', n: 'Xanh ngọc turqoise', g: 'C' },
    { c: 'C12', h: '#1E334E', n: 'Xanh navy tối', g: 'C' },
    { c: 'C13', h: '#CDE7FE', n: 'Xanh pastel nhạt', g: 'C' },
    { c: 'C14', h: '#D6FDFB', n: 'Xanh nước đá', g: 'C' },
    { c: 'C15', h: '#21C5C4', n: 'Xanh ngọc lam', g: 'C' },
    { c: 'C16', h: '#1758A2', n: 'Xanh đại dương', g: 'C' },
    { c: 'C17', h: '#03D1F4', n: 'Xanh neon cyan', g: 'C' },
    { c: 'C18', h: '#203245', n: 'Xanh đêm đen', g: 'C' },
    { c: 'C19', h: '#18869C', n: 'Xanh biển sâu', g: 'C' },
    { c: 'C20', h: '#1A70AA', n: 'Xanh biển cổ điển', g: 'C' },
    { c: 'C21', h: '#BEDDFC', n: 'Xanh mây trời', g: 'C' },
    { c: 'C22', h: '#6AB1BB', n: 'Xanh ngọc khói', g: 'C' },
    { c: 'C23', h: '#C8E2F9', n: 'Xanh băng giá', g: 'C' },
    { c: 'C24', h: '#7EC5F8', n: 'Xanh thiên thanh', g: 'C' },
    { c: 'C25', h: '#A9E8E0', n: 'Xanh ngọc sữa', g: 'C' },
    { c: 'C26', h: '#42AED2', n: 'Xanh hồ thu', g: 'C' },
    { c: 'C27', h: '#D0DEF9', n: 'Xanh tím nhạt', g: 'C' },
    { c: 'C28', h: '#BDCEE8', n: 'Xanh tro lạnh', g: 'C' },
    { c: 'C29', h: '#374A8A', n: 'Xanh tím than', g: 'C' },

    // Nhóm D: Tím, Tím hoa cà, Tím than (26 màu)
    { c: 'D01', h: '#ACB7EF', n: 'Tím hoa oải hương', g: 'D' },
    { c: 'D02', h: '#868DD3', n: 'Tím tử đinh hương', g: 'D' },
    { c: 'D03', h: '#3753B0', n: 'Tím hoa diên vĩ', g: 'D' },
    { c: 'D04', h: '#152C7D', n: 'Tím than đậm', g: 'D' },
    { c: 'D05', h: '#B44EC7', n: 'Tím phong lan', g: 'D' },
    { c: 'D06', h: '#B47BDE', n: 'Tím nhạt tươi', g: 'D' },
    { c: 'D07', h: '#8858AA', n: 'Tím mận nhạt', g: 'D' },
    { c: 'D08', h: '#E2D2FE', n: 'Tím pastel sữa', g: 'D' },
    { c: 'D09', h: '#D6BAF6', n: 'Tím hoa cà', g: 'D' },
    { c: 'D10', h: '#301B49', n: 'Tím nho đen', g: 'D' },
    { c: 'D11', h: '#BCBAE3', n: 'Tím khói pastel', g: 'D' },
    { c: 'D12', h: '#DD99CE', n: 'Tím hồng cánh sen', g: 'D' },
    { c: 'D13', h: '#B5038F', n: 'Tím cánh sen đậm', g: 'D' },
    { c: 'D14', h: '#892894', n: 'Tím hoàng gia', g: 'D' },
    { c: 'D15', h: '#301D8F', n: 'Tím thạch anh đậm', g: 'D' },
    { c: 'D16', h: '#E2E5EF', n: 'Tím sương mù', g: 'D' },
    { c: 'D17', h: '#C7D3F8', n: 'Tím xanh nhạt', g: 'D' },
    { c: 'D18', h: '#9A64B8', n: 'Tím cẩm tú cầu', g: 'D' },
    { c: 'D19', h: '#D9C3DA', n: 'Tím xám nhạt', g: 'D' },
    { c: 'D20', h: '#9C34AD', n: 'Tím cúc đại đóa', g: 'D' },
    { c: 'D21', h: '#950495', n: 'Tím đỏ tươi', g: 'D' },
    { c: 'D22', h: '#383996', n: 'Tím thẫm', g: 'D' },
    { c: 'D23', h: '#E9DCF7', n: 'Tím sương mai', g: 'D' },
    { c: 'D24', h: '#768AE1', n: 'Tím xanh tím than', g: 'D' },
    { c: 'D25', h: '#4950C0', n: 'Tím chàm', g: 'D' },
    { c: 'D26', h: '#D6C7EB', n: 'Tím khoai môn sữa', g: 'D' },

    // Nhóm E: Hồng, Hồng phấn, Magenta (24 màu)
    { c: 'E01', h: '#F5D5CB', n: 'Hồng da nhạt', g: 'E' },
    { c: 'E02', h: '#FDC1DE', n: 'Hồng baby', g: 'E' },
    { c: 'E03', h: '#F4BDE9', n: 'Hồng phấn tím', g: 'E' },
    { c: 'E04', h: '#E9629E', n: 'Hồng đào tươi', g: 'E' },
    { c: 'E05', h: '#F0559E', n: 'Hồng cánh sen tươi', g: 'E' },
    { c: 'E06', h: '#EC4073', n: 'Hồng dâu tây', g: 'E' },
    { c: 'E07', h: '#C63574', n: 'Hồng mận chín', g: 'E' },
    { c: 'E08', h: '#FDDBE9', n: 'Hồng kẹo ngọt', g: 'E' },
    { c: 'E09', h: '#E475C6', n: 'Hồng hoa mười giờ', g: 'E' },
    { c: 'E10', h: '#D33998', n: 'Hồng fuchsia đậm', g: 'E' },
    { c: 'E11', h: '#F7DAD4', n: 'Hồng vỏ đỗ nhạt', g: 'E' },
    { c: 'E12', h: '#F894BF', n: 'Hồng kẹo mút', g: 'E' },
    { c: 'E13', h: '#B5026A', n: 'Hồng tím rực', g: 'E' },
    { c: 'E14', h: '#FAD4BF', n: 'Hồng cam pastel', g: 'E' },
    { c: 'E15', h: '#F5C9CA', n: 'Hồng cánh hoa', g: 'E' },
    { c: 'E16', h: '#FCF4EC', n: 'Hồng sữa cực nhạt', g: 'E' },
    { c: 'E17', h: '#F7E3EC', n: 'Hồng phấn thơm', g: 'E' },
    { c: 'E18', h: '#FBC8DC', n: 'Hồng pastel dịu', g: 'E' },
    { c: 'E19', h: '#F6BBD1', n: 'Hồng anh đào', g: 'E' },
    { c: 'E20', h: '#D7C6CE', n: 'Hồng khói tro', g: 'E' },
    { c: 'E21', h: '#C19DA5', n: 'Hồng đất nhạt', g: 'E' },
    { c: 'E22', h: '#B58BA0', n: 'Hồng đất trầm', g: 'E' },
    { c: 'E23', h: '#937C8B', n: 'Hồng nho khô', g: 'E' },
    { c: 'E24', h: '#DDBEE6', n: 'Hồng tím cẩm chướng', g: 'E' },

    // Nhóm F: Đỏ, Đỏ cam, Đỏ rượu (25 màu)
    { c: 'F01', h: '#FF9381', n: 'Đỏ san hô nhạt', g: 'F' },
    { c: 'F02', h: '#F83D4C', n: 'Đỏ tươi cờ', g: 'F' },
    { c: 'F03', h: '#EE4D3D', n: 'Đỏ cà chua', g: 'F' },
    { c: 'F04', h: '#F92B41', n: 'Đỏ tươi rực', g: 'F' },
    { c: 'F05', h: '#E40328', n: 'Đỏ ruby thuần', g: 'F' },
    { c: 'F06', h: '#913635', n: 'Đỏ gạch nung', g: 'F' },
    { c: 'F07', h: '#911932', n: 'Đỏ bordeaux thẫm', g: 'F' },
    { c: 'F08', h: '#BB0126', n: 'Đỏ thẫm sâu', g: 'F' },
    { c: 'F09', h: '#E06779', n: 'Đỏ hoa hồng nhung', g: 'F' },
    { c: 'F10', h: '#894729', n: 'Đỏ nâu gạch', g: 'F' },
    { c: 'F11', h: '#5B2424', n: 'Đỏ nâu đậm', g: 'F' },
    { c: 'F12', h: '#F8526D', n: 'Đỏ dưa hấu', g: 'F' },
    { c: 'F13', h: '#F55E46', n: 'Đỏ cam cháy', g: 'F' },
    { c: 'F14', h: '#FBADB1', n: 'Đỏ hồng phấn', g: 'F' },
    { c: 'F15', h: '#D50527', n: 'Đỏ đô cổ điển', g: 'F' },
    { c: 'F16', h: '#F8C0AA', n: 'Đỏ cam kem', g: 'F' },
    { c: 'F17', h: '#E89B7C', n: 'Đỏ đất gốm', g: 'F' },
    { c: 'F18', h: '#D07E4A', n: 'Đỏ cam đất', g: 'F' },
    { c: 'F19', h: '#BF454A', n: 'Đỏ mận chín', g: 'F' },
    { c: 'F20', h: '#C69495', n: 'Đỏ tro nhạt', g: 'F' },
    { c: 'F21', h: '#F1B8C7', n: 'Đỏ anh đào nhạt', g: 'F' },
    { c: 'F22', h: '#F7C3D0', n: 'Đỏ kem dâu', g: 'F' },
    { c: 'F23', h: '#ED806E', n: 'Đỏ cam san hô', g: 'F' },
    { c: 'F24', h: '#E09DAF', n: 'Đỏ cánh sen trầm', g: 'F' },
    { c: 'F25', h: '#E74855', n: 'Đỏ quả mâm xôi', g: 'F' },

    // Nhóm G: Nâu, Be, Vàng đất, Màu da (21 màu)
    { c: 'G01', h: '#FFE4D2', n: 'Da người sáng', g: 'G' },
    { c: 'G02', h: '#FBC6AA', n: 'Da người tự nhiên', g: 'G' },
    { c: 'G03', h: '#F1C4A6', n: 'Da ấm ngả cam', g: 'G' },
    { c: 'G04', h: '#DCB388', n: 'Vàng cát sa mạc', g: 'G' },
    { c: 'G05', h: '#E7B34E', n: 'Vàng mật ong', g: 'G' },
    { c: 'G06', h: '#E2A113', n: 'Vàng mù tạt', g: 'G' },
    { c: 'G07', h: '#975D3A', n: 'Nâu hạt dẻ', g: 'G' },
    { c: 'G08', h: '#713C2E', n: 'Nâu sô-cô-la', g: 'G' },
    { c: 'G09', h: '#E4B585', n: 'Nâu be sữa', g: 'G' },
    { c: 'G10', h: '#DB8C42', n: 'Nâu caramel ấm', g: 'G' },
    { c: 'G11', h: '#DAC998', n: 'Vàng khaki nhạt', g: 'G' },
    { c: 'G12', h: '#FEC994', n: 'Vàng mơ chín', g: 'G' },
    { c: 'G13', h: '#B2714C', n: 'Nâu đất nung', g: 'G' },
    { c: 'G14', h: '#8B694D', n: 'Nâu gỗ tếch', g: 'G' },
    { c: 'G15', h: '#F6F9E4', n: 'Be sữa ngà', g: 'G' },
    { c: 'G16', h: '#F2D8C1', n: 'Da đào sữa', g: 'G' },
    { c: 'G17', h: '#79544E', n: 'Nâu gỗ mun', g: 'G' },
    { c: 'G18', h: '#FFE3D6', n: 'Da tuyết hồng', g: 'G' },
    { c: 'G19', h: '#DC7D40', n: 'Nâu đồng ấm', g: 'G' },
    { c: 'G20', h: '#A74630', n: 'Nâu đỏ gạch nung', g: 'G' },
    { c: 'G21', h: '#B48661', n: 'Nâu cà phê sữa', g: 'G' },

    // Nhóm H: Trắng, Xám, Đen, Khói (23 màu) - ĐẶC BIỆT CHUẨN XÁC MÀU TRẮNG
    { c: 'H01', h: '#FCFBFC', n: 'Trắng sứ', g: 'H' },
    { c: 'H02', h: '#FFFFFF', n: 'Trắng tinh khiết', g: 'H' }, // Màu trắng chuẩn hạt ủi MARD
    { c: 'H03', h: '#B4B4B4', n: 'Xám sáng', g: 'H' },
    { c: 'H04', h: '#888888', n: 'Xám trung tính', g: 'H' },
    { c: 'H05', h: '#464548', n: 'Xám than chì', g: 'H' },
    { c: 'H06', h: '#2C2C2C', n: 'Xám đen đậm', g: 'H' },
    { c: 'H07', h: '#010101', n: 'Đen tuyền', g: 'H' },
    { c: 'H08', h: '#E7D6DC', n: 'Xám phớt hồng', g: 'H' },
    { c: 'H09', h: '#EFEDEE', n: 'Xám ngọc trai', g: 'H' },
    { c: 'H10', h: '#EDEAEB', n: 'Xám khói nhạt', g: 'H' },
    { c: 'H11', h: '#CDCDCD', n: 'Xám bạc sáng', g: 'H' },
    { c: 'H12', h: '#FDF6ED', n: 'Trắng kem ấm', g: 'H' },
    { c: 'H13', h: '#F4F0D1', n: 'Vàng kem vỏ trứng', g: 'H' },
    { c: 'H14', h: '#CED7D4', n: 'Xám phớt ngọc', g: 'H' },
    { c: 'H15', h: '#98A6A6', n: 'Xám xi măng', g: 'H' },
    { c: 'H16', h: '#1B1213', n: 'Đen cà phê espresso', g: 'H' },
    { c: 'H17', h: '#F0EEEF', n: 'Trắng tuyết', g: 'H' },
    { c: 'H18', h: '#FCFFF8', n: 'Trắng ngọc', g: 'H' },
    { c: 'H19', h: '#F2EFE7', n: 'Trắng ngà cự thạch', g: 'H' },
    { c: 'H20', h: '#97A09F', n: 'Xám ghi đá', g: 'H' },
    { c: 'H21', h: '#F8FCE6', n: 'Trắng ánh lục', g: 'H' },
    { c: 'H22', h: '#C9CAD3', n: 'Xám hoa cà nhạt', g: 'H' },
    { c: 'H23', h: '#9B9C95', n: 'Xám rêu nhạt', g: 'H' },

    // Nhóm M: Tông màu Pastel, Cổ điển, Vintage đặc biệt (15 màu)
    { c: 'M01', h: '#B9C8B5', n: 'Xanh lục sage nhạt', g: 'M' },
    { c: 'M02', h: '#909A94', n: 'Xanh lục xám đá', g: 'M' },
    { c: 'M03', h: '#6A7E80', n: 'Xanh rêu xám sẫm', g: 'M' },
    { c: 'M04', h: '#E0D4BB', n: 'Vàng cát cổ điển', g: 'M' },
    { c: 'M05', h: '#D0CBAF', n: 'Khaki vintage', g: 'M' },
    { c: 'M06', h: '#B0AA85', n: 'Oliu bụi bặm', g: 'M' },
    { c: 'M07', h: '#B0A796', n: 'Nâu tro vintage', g: 'M' },
    { c: 'M08', h: '#AE8082', n: 'Hồng đất cổ điển', g: 'M' },
    { c: 'M09', h: '#A98866', n: 'Nâu đồng vintage', g: 'M' },
    { c: 'M10', h: '#C6B2BB', n: 'Tím khói cổ điển', g: 'M' },
    { c: 'M11', h: '#9E7794', n: 'Tím hoa cà vintage', g: 'M' },
    { c: 'M12', h: '#644C52', n: 'Nâu tím gỗ gụ', g: 'M' },
    { c: 'M13', h: '#C79367', n: 'Cam đất mộc mạc', g: 'M' },
    { c: 'M14', h: '#C47564', n: 'Đỏ gạch vintage', g: 'M' },
    { c: 'M15', h: '#747E7A', n: 'Xám xanh đá phiến', g: 'M' }
  ];

  // =========================================================================
  // 2. KHOA HỌC MÀU SẮC & KHÔNG GIAN LAB / CIEDE2000
  // =========================================================================
  function hexToRgb(hex) {
    const clean = hex.replace('#', '').trim();
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  function rgbToLab(r, g, b) {
    let R = r / 255, G = g / 255, B = b / 255;
    R = R > 0.04045 ? Math.pow((R + 0.055) / 1.055, 2.4) : R / 12.92;
    G = G > 0.04045 ? Math.pow((G + 0.055) / 1.055, 2.4) : G / 12.92;
    B = B > 0.04045 ? Math.pow((B + 0.055) / 1.055, 2.4) : B / 12.92;

    const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
    const Y = (R * 0.2126 + G * 0.7152 + B * 0.0722) / 1.00000;
    const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;

    const f = (t) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
    const fx = f(X), fy = f(Y), fz = f(Z);

    return {
      L: 116 * fy - 16,
      a: 500 * (fx - fy),
      b: 200 * (fy - fz)
    };
  }

  // Thuật toán khoảng cách màu Delta E (CIE76 chuẩn và CIEDE2000 chính xác mắt người)
  function deltaE(lab1, lab2) {
    // Trọng số CIELAB chuẩn
    const dL = lab1.L - lab2.L;
    const da = lab1.a - lab2.a;
    const db = lab1.b - lab2.b;
    return dL * dL + da * da + db * db;
  }

  // Khởi tạo bảng màu có sẵn LAB
  let MARD_PALETTE = MARD_PALETTE_RAW.map(item => {
    const rgb = hexToRgb(item.h);
    return {
      ...item,
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      lab: rgbToLab(rgb.r, rgb.g, rgb.b)
    };
  });

  // Tìm màu hạt gần nhất
  function findNearestBead(r, g, b, paletteList) {
    // Nếu là màu trắng tinh (#FFFFFF) hoặc gần như trắng tinh, ưu tiên tuyệt đối H02
    if (r >= 253 && g >= 253 && b >= 253) {
      const h02 = paletteList.find(p => p.c === 'H02');
      if (h02) return h02;
    }

    const lab = rgbToLab(r, g, b);
    let best = paletteList[0];
    let minD = Infinity;

    for (let i = 0; i < paletteList.length; i++) {
      const p = paletteList[i];
      const d = deltaE(lab, p.lab);
      if (d < minD) {
        minD = d;
        best = p;
      }
    }
    return best;
  }

  // =========================================================================
  // 3. TRẠNG THÁI TOÀN CỤC CỦA ỨNG DỤNG (STATE)
  // =========================================================================
  const state = {
    img: null,            // Ảnh nguồn Image object
    imgWidth: 0,
    imgHeight: 0,
    fileName: '',

    // Kích thước lưới
    cols: 29,             // Số cột (W) - mặc định 29 (1 bảng pegboard MARD)
    rows: 29,             // Số hàng (H) - mặc định 29
    lockAspect: true,

    // Cài đặt xử lý
    bgMode: 'alpha',      // 'alpha' (theo kênh trong suốt PNG), 'keep_all' (giữ trắng làm H02), 'flood_white' (tự tách nền trắng ở viền)
    whiteTolerance: 15,   // Ngưỡng phát hiện nền trắng (0 - 50)
    fitMode: 'fit',       // 'fit', 'cover'
    trimEmpty: false,     // Tự cắt viền thừa
    dithering: false,     // Thuật toán khuếch tán lỗi
    maxColors: 0,         // 0: không giới hạn, hoặc số màu
    contrast: 0,          // Tăng giảm tương phản (-50 đến 50)
    saturation: 0,        // Tăng giảm bão hòa (-50 đến 50)

    // Dữ liệu lưới hạt: Mảng (rows * cols), mỗi phần tử là đối tượng màu MARD hoặc null (ô trống/trong suốt)
    grid: [],

    // Công cụ & hiển thị
    currentTool: 'pencil', // 'pencil', 'bucket', 'picker', 'eraser', 'pan'
    currentColor: null,    // null là ô trống, hoặc object màu MARD. Mặc định chọn H02
    highlightColor: null,  // Mã màu đang được soi sáng nổi bật trên lưới
    viewMode: 'realistic', // 'realistic' (hạt tròn có lỗ), 'flat' (ô vuông)
    showCodes: true,       // Hiển thị mã màu chữ
    gridLineStyle: '10',   // 'none', '10' (vạch 10 ô), '29' (vạch 29 ô pegboard)

    // Viewport & Zoom
    zoom: 1.0,             // 0.5 -> 3.0
    panX: 0,
    panY: 0,

    // Lịch sử hoàn tác
    history: [],
    historyIndex: -1,
    maxHistory: 30
  };

  // Đặt màu mặc định là H02 (Trắng tinh)
  const defaultWhite = MARD_PALETTE.find(p => p.c === 'H02') || MARD_PALETTE[0];
  state.currentColor = defaultWhite;

  // =========================================================================
  // 4. TIỆN ÍCH DOM VÀ GIAO DIỆN
  // =========================================================================
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  function showToast(message, duration = 2500) {
    const container = $('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // 5. THUẬT TOÁN TÁCH NỀN TRẮNG THÔNG MINH (FLOOD FILL TỪ 4 GÓC VIỀN)
  // =========================================================================
  /**
   * Chỉ xóa nền trắng bên NGOÀI kết nối với viền ảnh.
   * Giữ nguyên 100% các chi tiết màu trắng BÊN TRONG chủ thể (mắt, áo, lông, da trắng)!
   */
  function floodFillWhiteBackground(ctx, width, height, tolerance) {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Kiểm tra pixel có phải màu trắng/gần trắng không
    function isNearWhite(idx) {
      const a = data[idx + 3];
      if (a < 50) return true; // Trong suốt sẵn
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const threshold = 255 - tolerance * 3.5;
      return r >= threshold && g >= threshold && b >= threshold;
    }

    // Đẩy tất cả các pixel ở 4 cạnh viền vào hàng đợi nếu chúng gần trắng
    for (let x = 0; x < width; x++) {
      const topIdx = (0 * width + x) * 4;
      if (isNearWhite(topIdx)) {
        queue.push(x, 0);
        visited[x] = 1;
      }
      const botIdx = ((height - 1) * width + x) * 4;
      if (isNearWhite(botIdx)) {
        queue.push(x, height - 1);
        visited[(height - 1) * width + x] = 1;
      }
    }
    for (let y = 0; y < height; y++) {
      const leftIdx = (y * width + 0) * 4;
      if (isNearWhite(leftIdx) && !visited[y * width]) {
        queue.push(0, y);
        visited[y * width] = 1;
      }
      const rightIdx = (y * width + (width - 1)) * 4;
      if (isNearWhite(rightIdx) && !visited[y * width + (width - 1)]) {
        queue.push(width - 1, y);
        visited[y * width + (width - 1)] = 1;
      }
    }

    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];
      const cIdx = (cy * width + cx) * 4;

      // Biến pixel nền này thành trong suốt hoàn toàn!
      data[cIdx + 3] = 0;

      // Lan sang 4 hướng lân cận
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];

      for (let i = 0; i < 4; i++) {
        const nx = neighbors[i][0];
        const ny = neighbors[i][1];
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nPos = ny * width + nx;
          if (!visited[nPos]) {
            visited[nPos] = 1;
            const nIdx = nPos * 4;
            if (isNearWhite(nIdx)) {
              queue.push(nx, ny);
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  // =========================================================================
  // 6. CHUYỂN ĐỔI ẢNH THÀNH LƯỚI HẠT (IMAGE TO BEAD GRID PIPELINE)
  // =========================================================================
  function convertImageToGrid() {
    if (!state.img) {
      showToast('⚠️ Vui lòng chọn một hình ảnh trước.');
      return;
    }

    const cols = state.cols;
    const rows = state.rows;
    const pal = MARD_PALETTE;

    // 1. Tạo Canvas trung gian để vẽ và xử lý kích thước ảnh
    const maxWorkDim = 1000;
    const scale = Math.min(1, maxWorkDim / Math.max(state.img.width, state.img.height));
    const workW = Math.max(1, Math.round(state.img.width * scale));
    const workH = Math.max(1, Math.round(state.img.height * scale));

    const workCanvas = document.createElement('canvas');
    workCanvas.width = workW;
    workCanvas.height = workH;
    const ctx = workCanvas.getContext('2d', { willReadFrequently: true });

    // Vẽ ảnh gốc lên canvas trung gian
    ctx.drawImage(state.img, 0, 0, workW, workH);

    // 2. Tách nền thông minh nếu được bật
    if (state.bgMode === 'flood_white') {
      floodFillWhiteBackground(ctx, workW, workH, state.whiteTolerance);
    }

    let srcData = ctx.getImageData(0, 0, workW, workH);
    let d = srcData.data;

    // 3. Tự động cắt bỏ viền trống (Auto-trim bounding box) nếu bật
    let x0 = 0, y0 = 0, x1 = workW, y1 = workH;
    if (state.trimEmpty) {
      let minX = workW, minY = workH, maxX = -1, maxY = -1;
      for (let y = 0; y < workH; y++) {
        for (let x = 0; x < workW; x++) {
          const a = d[(y * workW + x) * 4 + 3];
          if (a > 30) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (maxX >= minX && maxY >= minY) {
        x0 = minX;
        y0 = minY;
        x1 = maxX + 1;
        y1 = maxY + 1;
      }
    }

    const boxW = x1 - x0;
    const boxH = y1 - y0;

    // 4. Lấy mẫu cho từng ô lưới (Cell Resampling)
    const newGrid = new Array(rows * cols).fill(null);

    // Tính toán vùng căn chỉnh theo fitMode
    let sampleScale = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (state.fitMode === 'cover') {
      sampleScale = Math.max(boxW / cols, boxH / rows);
      offsetX = (x0 + x1) / 2 - (cols * sampleScale) / 2;
      offsetY = (y0 + y1) / 2 - (rows * sampleScale) / 2;
    } else {
      // 'fit': Thu vừa khung lưới
      sampleScale = Math.max(boxW / cols, boxH / rows);
      offsetX = (x0 + x1) / 2 - (cols * sampleScale) / 2;
      offsetY = (y0 + y1) / 2 - (rows * sampleScale) / 2;
    }

    // Tiền xử lý RGB mảng cho thuật toán Floyd-Steinberg nếu bật
    const tempPixels = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ax = Math.floor(offsetX + c * sampleScale);
        const bx = Math.max(ax + 1, Math.ceil(offsetX + (c + 1) * sampleScale));
        const ay = Math.floor(offsetY + r * sampleScale);
        const by = Math.max(ay + 1, Math.ceil(offsetY + (r + 1) * sampleScale));

        let totalSamples = 0;
        let opaqueSamples = 0;
        let sumR = 0, sumG = 0, sumB = 0;

        for (let sy = ay; sy < by; sy++) {
          for (let sx = ax; sx < bx; sx++) {
            totalSamples++;
            if (sx < 0 || sy < 0 || sx >= workW || sy >= workH) {
              continue; // Nằm ngoài ảnh
            }
            const offset = (sy * workW + sx) * 4;
            const a = d[offset + 3];

            if (state.bgMode === 'keep_all') {
              // Giữ tất cả: coi như 100% đục
              opaqueSamples++;
              sumR += d[offset];
              sumG += d[offset + 1];
              sumB += d[offset + 2];
            } else {
              // Kênh alpha hoặc flood fill
              if (a >= 80) {
                opaqueSamples++;
                sumR += d[offset];
                sumG += d[offset + 1];
                sumB += d[offset + 2];
              }
            }
          }
        }

        const cellIndex = r * cols + c;

        // Nếu ô có quá ít pixel đục (< 35%) thì coi là Ô TRỐNG (Trong suốt)
        if (state.bgMode !== 'keep_all' && (opaqueSamples === 0 || opaqueSamples / totalSamples < 0.35)) {
          newGrid[cellIndex] = null;
          tempPixels.push(null);
        } else {
          // Tính màu trung bình
          let avgR = sumR / opaqueSamples;
          let avgG = sumG / opaqueSamples;
          let avgB = sumB / opaqueSamples;

          // Áp dụng tăng tương phản / bão hòa nếu có
          if (state.contrast !== 0) {
            const factor = (259 * (state.contrast + 255)) / (255 * (259 - state.contrast));
            avgR = Math.max(0, Math.min(255, factor * (avgR - 128) + 128));
            avgG = Math.max(0, Math.min(255, factor * (avgG - 128) + 128));
            avgB = Math.max(0, Math.min(255, factor * (avgB - 128) + 128));
          }

          tempPixels.push({ r: avgR, g: avgG, b: avgB, idx: cellIndex });
        }
      }
    }

    // 5. Khớp màu với bảng MARD (có hỗ trợ Floyd-Steinberg hoặc chuẩn)
    if (state.dithering) {
      // Dithering ma trận Floyd-Steinberg
      const buffer = tempPixels.map(p => p ? { r: p.r, g: p.g, b: p.b } : null);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const pixel = buffer[idx];
          if (!pixel) continue;

          const matched = findNearestBead(pixel.r, pixel.g, pixel.b, pal);
          newGrid[idx] = matched;

          // Tính sai số
          const errR = pixel.r - matched.r;
          const errG = pixel.g - matched.g;
          const errB = pixel.b - matched.b;

          // Phân tán sai số cho các ô xung quanh
          const spread = [
            [c + 1, r, 7 / 16],
            [c - 1, r + 1, 3 / 16],
            [c, r + 1, 5 / 16],
            [c + 1, r + 1, 1 / 16]
          ];

          for (let s = 0; s < spread.length; s++) {
            const sc = spread[s][0], sr = spread[s][1], weight = spread[s][2];
            if (sc >= 0 && sc < cols && sr >= 0 && sr < rows) {
              const targetIdx = sr * cols + sc;
              if (buffer[targetIdx]) {
                buffer[targetIdx].r = Math.max(0, Math.min(255, buffer[targetIdx].r + errR * weight));
                buffer[targetIdx].g = Math.max(0, Math.min(255, buffer[targetIdx].g + errG * weight));
                buffer[targetIdx].b = Math.max(0, Math.min(255, buffer[targetIdx].b + errB * weight));
              }
            }
          }
        }
      }
    } else {
      // Không dither: Khớp trực tiếp từng ô
      for (let i = 0; i < tempPixels.length; i++) {
        const p = tempPixels[i];
        if (p) {
          newGrid[p.idx] = findNearestBead(p.r, p.g, p.b, pal);
        }
      }
    }

    // 6. Giới hạn số lượng màu tối đa (nếu người dùng cài đặt)
    if (state.maxColors > 0) {
      const counts = new Map();
      for (let i = 0; i < newGrid.length; i++) {
        const b = newGrid[i];
        if (b) counts.set(b, (counts.get(b) || 0) + 1);
      }
      if (counts.size > state.maxColors) {
        // Giữ lại N màu có số lượng nhiều nhất
        const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
        const keptColors = sorted.slice(0, state.maxColors).map(e => e[0]);

        // Thay thế các màu còn lại bằng màu gần nhất trong danh sách giữ lại
        for (let i = 0; i < newGrid.length; i++) {
          const b = newGrid[i];
          if (b && !keptColors.includes(b)) {
            newGrid[i] = findNearestBead(b.r, b.g, b.b, keptColors);
          }
        }
      }
    }

    // Cập nhật State và lưu Lịch sử
    state.grid = newGrid;
    pushHistory();
    state.highlightColor = null;

    // Vẽ lại Canvas & cập nhật thống kê hạt
    renderGrid();
    updateInventory();
    autoSave();

    showToast(`Đã tạo lưới ${cols}×${rows} ô thành công!`);
  }

  // =========================================================================
  // 7. RENDER LƯỚI HẠT TRÊN HTML5 CANVAS (VỚI RETINA / HIDPI DISPLAY)
  // =========================================================================
  const canvas = $('bead-canvas');
  const ctx = canvas.getContext('2d');

  // Kích thước 1 ô pixel vẽ (CSS pixels)
  const CELL_SIZE = 28;
  const RULER_SIZE = 24; // Thước đo tọa độ

  function renderGrid() {
    if (!state.grid.length) return;

    const cols = state.cols;
    const rows = state.rows;
    const totalW = RULER_SIZE + cols * CELL_SIZE;
    const totalH = RULER_SIZE + rows * CELL_SIZE;

    // Retina 2x display
    const dpr = window.devicePixelRatio || 1;
    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = totalW + 'px';
    canvas.style.height = totalH + 'px';

    ctx.save();
    ctx.scale(dpr, dpr);

    // Nền trắng tổng thể
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, totalW, totalH);

    // 1. VẼ THƯỚC ĐO TỌA ĐỘ (RULER)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, totalW, RULER_SIZE);
    ctx.fillRect(0, 0, RULER_SIZE, totalH);

    ctx.fillStyle = '#64748b';
    ctx.font = '600 10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Đánh số cột (trên cùng)
    for (let c = 0; c < cols; c++) {
      const x = RULER_SIZE + c * CELL_SIZE + CELL_SIZE / 2;
      ctx.fillText(c + 1, x, RULER_SIZE / 2);
    }
    // Đánh số hàng (bên trái)
    for (let r = 0; r < rows; r++) {
      const y = RULER_SIZE + r * CELL_SIZE + CELL_SIZE / 2;
      ctx.fillText(r + 1, RULER_SIZE / 2, y);
    }

    // 2. VẼ TỪNG Ô LƯỚI HẠT
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const bead = state.grid[idx];
        const cellX = RULER_SIZE + c * CELL_SIZE;
        const cellY = RULER_SIZE + r * CELL_SIZE;

        if (!bead) {
          // --- Ô TRỐNG (TRONG SUỐT / KHÔNG CÓ HẠT) ---
          // Vẽ hoa văn bàn cờ ca rô chuẩn Photoshop (checkerboard) cực kỳ trực quan
          drawCheckerboard(ctx, cellX, cellY, CELL_SIZE, CELL_SIZE);

          // Vẽ một chấm tròn nhạt ở giữa mô phỏng chân cắm pegboard trống
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.arc(cellX + CELL_SIZE / 2, cellY + CELL_SIZE / 2, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // --- Ô CÓ HẠT (BẢO ĐẢM MÀU TRẮNG H02 RÕ RÀNG VÀ ĐẸP) ---
          if (state.viewMode === 'realistic') {
            // Chế độ vẽ hạt ủi 3D chân thực
            drawRealisticBead(ctx, cellX, cellY, CELL_SIZE, bead);
          } else {
            // Chế độ phẳng (Flat pixel)
            ctx.fillStyle = bead.h;
            ctx.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);

            // Viền nhẹ cho ô màu trắng để không lẫn vào nền
            if (bead.c === 'H02' || bead.c === 'H01') {
              ctx.strokeStyle = '#cbd5e1';
              ctx.lineWidth = 1;
              ctx.strokeRect(cellX + 0.5, cellY + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
            }
          }

          // In mã màu chữ (A01, H02, v.v.)
          if (state.showCodes) {
            ctx.font = '700 9px -apple-system, BlinkMacSystemFont, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Tính độ tương phản: Nếu nền sáng thì chữ màu xám đậm (#0f172a), nền tối thì chữ trắng (#ffffff)
            const luminance = 0.299 * bead.r + 0.587 * bead.g + 0.114 * bead.b;
            ctx.fillStyle = luminance > 140 ? '#0f172a' : '#ffffff';

            ctx.fillText(bead.c, cellX + CELL_SIZE / 2, cellY + CELL_SIZE / 2);
          }

          // Nếu đang bật chế độ Soi sáng (Highlight 1 màu cụ thể)
          if (state.highlightColor && bead.c !== state.highlightColor) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
            ctx.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }

    // 3. VẼ VẠCH CHIA KHUNG PEGBOARD (GRID LINES)
    // Vạch mảnh chia từng ô
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = RULER_SIZE + c * CELL_SIZE;
      ctx.moveTo(x, RULER_SIZE);
      ctx.lineTo(x, totalH);
    }
    for (let r = 0; r <= rows; r++) {
      const y = RULER_SIZE + r * CELL_SIZE;
      ctx.moveTo(RULER_SIZE, y);
      ctx.lineTo(totalW, y);
    }
    ctx.stroke();

    // Vạch đậm chia mỗi 10 ô hoặc mỗi 29 ô (Chuẩn pegboard)
    const step = state.gridLineStyle === '29' ? 29 : (state.gridLineStyle === '10' ? 10 : 0);
    if (step > 0) {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let c = 0; c <= cols; c += step) {
        const x = RULER_SIZE + c * CELL_SIZE;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, totalH);
      }
      for (let r = 0; r <= rows; r += step) {
        const y = RULER_SIZE + r * CELL_SIZE;
        ctx.moveTo(0, y);
        ctx.lineTo(totalW, y);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  // Hàm vẽ bàn cờ ca rô thể hiện ô trong suốt
  function drawCheckerboard(context, x, y, w, h) {
    const square = 6;
    for (let py = 0; py < h; py += square) {
      for (let px = 0; px < w; px += square) {
        const isWhite = ((px / square + py / square) % 2) === 0;
        context.fillStyle = isWhite ? '#f8fafc' : '#e2e8f0';
        context.fillRect(x + px, y + py, Math.min(square, w - px), Math.min(square, h - py));
      }
    }
    // Viền nhẹ cho ô trong suốt
    context.strokeStyle = '#cbd5e1';
    context.lineWidth = 0.5;
    context.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }

  // Hàm vẽ hạt ủi tròn 3D chân thực
  function drawRealisticBead(context, x, y, size, bead) {
    const pad = 1.5;
    const r = (size - pad * 2) / 2;
    const cx = x + size / 2;
    const cy = y + size / 2;

    // Nền vuông mờ dưới hạt
    context.fillStyle = '#f8fafc';
    context.fillRect(x, y, size, size);

    // Bóng đổ nhẹ dưới hạt
    context.fillStyle = 'rgba(0, 0, 0, 0.12)';
    context.beginPath();
    context.arc(cx + 1, cy + 1, r, 0, Math.PI * 2);
    context.fill();

    // Thân hạt tròn
    context.fillStyle = bead.h;
    context.beginPath();
    context.arc(cx, cy, r, 0, Math.PI * 2);
    context.fill();

    // Viền tròn của hạt (đặc biệt cho hạt trắng H02, H01 để nổi bật)
    context.strokeStyle = (bead.c === 'H02' || bead.c === 'H01') ? 'rgba(100, 116, 139, 0.4)' : 'rgba(0, 0, 0, 0.15)';
    context.lineWidth = 1;
    context.stroke();

    // Lỗ xỏ hạt ở giữa (đặc trưng của hạt ủi Perler/Hama/MARD)
    const holeR = r * 0.38;
    context.fillStyle = 'rgba(0, 0, 0, 0.08)';
    context.beginPath();
    context.arc(cx, cy, holeR + 1, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(cx, cy, holeR, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    context.lineWidth = 0.8;
    context.stroke();
  }

  // =========================================================================
  // 8. TƯƠNG TÁC CHỈNH SỬA TRÊN LƯỚI (TOOLS: PENCIL, BUCKET, PICKER, ERASER)
  // =========================================================================
  let isPointerDown = false;
  let lastEditedCell = -1;

  function getCellFromCoords(evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (window.devicePixelRatio || 1) / rect.width;
    const scaleY = canvas.height / (window.devicePixelRatio || 1) / rect.height;

    const x = (evt.clientX - rect.left) * scaleX;
    const y = (evt.clientY - rect.top) * scaleY;

    if (x < RULER_SIZE || y < RULER_SIZE) return null;

    const col = Math.floor((x - RULER_SIZE) / CELL_SIZE);
    const row = Math.floor((y - RULER_SIZE) / CELL_SIZE);

    if (col < 0 || col >= state.cols || row < 0 || row >= state.rows) return null;

    return { col, row, index: row * state.cols + col };
  }

  // Flood fill công cụ Đổ màu (Bucket)
  function bucketFill(startIndex, targetColor) {
    const origBead = state.grid[startIndex];
    const origCode = origBead ? origBead.c : null;
    const newCode = targetColor ? targetColor.c : null;

    if (origCode === newCode) return; // Cùng màu

    const cols = state.cols;
    const rows = state.rows;
    const queue = [startIndex];
    const visited = new Uint8Array(state.grid.length);
    visited[startIndex] = 1;

    while (queue.length > 0) {
      const idx = queue.shift();
      state.grid[idx] = targetColor;

      const c = idx % cols;
      const r = Math.floor(idx / cols);

      const neighbors = [];
      if (c > 0) neighbors.push(idx - 1);
      if (c < cols - 1) neighbors.push(idx + 1);
      if (r > 0) neighbors.push(idx - cols);
      if (r < rows - 1) neighbors.push(idx + cols);

      for (let i = 0; i < neighbors.length; i++) {
        const nIdx = neighbors[i];
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          const nBead = state.grid[nIdx];
          const nCode = nBead ? nBead.c : null;
          if (nCode === origCode) {
            queue.push(nIdx);
          }
        }
      }
    }

    pushHistory();
    renderGrid();
    updateInventory();
    autoSave();
  }

  function handleCanvasClick(cell, isDrag = false) {
    if (!cell) return;
    const idx = cell.index;

    if (state.currentTool === 'picker') {
      // Hút màu từ ô
      const picked = state.grid[idx];
      selectColor(picked);
      showToast(picked ? `Đã hút mã màu ${picked.c} - ${picked.n}` : 'Đã hút: Ô trống (trong suốt)');
      setTool('pencil');
      return;
    }

    if (state.currentTool === 'bucket') {
      // Đổ màu
      bucketFill(idx, state.currentColor);
      return;
    }

    if (state.currentTool === 'eraser') {
      // Xóa thành ô trống
      if (state.grid[idx] === null) return;
      state.grid[idx] = null;
      renderGrid();
      updateInventory();
      if (!isDrag) {
        pushHistory();
        autoSave();
      }
      return;
    }

    if (state.currentTool === 'pencil') {
      // Vẽ màu đang chọn
      const currentCode = state.grid[idx] ? state.grid[idx].c : null;
      const targetCode = state.currentColor ? state.currentColor.c : null;

      if (currentCode === targetCode) return; // Không cần đổi

      state.grid[idx] = state.currentColor;
      renderGrid();
      updateInventory();
      if (!isDrag) {
        pushHistory();
        autoSave();
      }
    }
  }

  // Sự kiện chuột trên Canvas
  canvas.addEventListener('mousedown', (e) => {
    if (state.currentTool === 'pan' || e.button === 1 || e.spaceKey) return;
    isPointerDown = true;
    const cell = getCellFromCoords(e);
    if (cell) {
      lastEditedCell = cell.index;
      handleCanvasClick(cell, false);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isPointerDown) {
      isPointerDown = false;
      pushHistory();
      autoSave();
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const cell = getCellFromCoords(e);

    // Cập nhật thanh hiển thị tọa độ & màu ở footer canvas
    if (cell) {
      const bead = state.grid[cell.index];
      $('info-coords').textContent = `Cột: ${cell.col + 1}, Hàng: ${cell.row + 1}`;
      $('info-color').innerHTML = bead
        ? `<span class="inventory-color-chip" style="background:${bead.h}"></span> <strong>${bead.c}</strong> - ${bead.n} (${bead.h})`
        : '<span class="inventory-color-chip" style="background:repeating-conic-gradient(#e2e8f0 0% 25%, #fff 0% 50%) 50%/6px 6px"></span> <strong>Ô trống</strong> (Không cần hạt)';

      if (isPointerDown && (state.currentTool === 'pencil' || state.currentTool === 'eraser')) {
        if (cell.index !== lastEditedCell) {
          lastEditedCell = cell.index;
          handleCanvasClick(cell, true);
        }
      }
    } else {
      $('info-coords').textContent = `Cột: --, Hàng: --`;
      $('info-color').textContent = 'Di chuột vào lưới để xem thông tin';
    }
  });

  // =========================================================================
  // 9. LỊCH SỬ HOÀN TÁC (UNDO / REDO)
  // =========================================================================
  function pushHistory() {
    // Cắt bỏ các nhánh redo nếu có
    if (state.historyIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.historyIndex + 1);
    }
    // Sao lưu bản sao lưới hiện tại
    state.history.push([...state.grid]);
    if (state.history.length > state.maxHistory) {
      state.history.shift();
    }
    state.historyIndex = state.history.length - 1;
    updateUndoRedoButtons();
  }

  function undo() {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      state.grid = [...state.history[state.historyIndex]];
      renderGrid();
      updateInventory();
      updateUndoRedoButtons();
      autoSave();
    }
  }

  function redo() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      state.grid = [...state.history[state.historyIndex]];
      renderGrid();
      updateInventory();
      updateUndoRedoButtons();
      autoSave();
    }
  }

  function updateUndoRedoButtons() {
    const btnUndo = $('btn-undo');
    const btnRedo = $('btn-redo');
    if (btnUndo) btnUndo.disabled = state.historyIndex <= 0;
    if (btnRedo) btnRedo.disabled = state.historyIndex >= state.history.length - 1;
  }

  // =========================================================================
  // 10. THAY THẾ MÀU HÀNG LOẠT (REPLACE COLOR)
  // =========================================================================
  function replaceColor(sourceCode, targetColor) {
    let count = 0;
    for (let i = 0; i < state.grid.length; i++) {
      const b = state.grid[i];
      const code = b ? b.c : 'EMPTY';
      if (code === sourceCode) {
        state.grid[i] = targetColor;
        count++;
      }
    }
    if (count > 0) {
      pushHistory();
      renderGrid();
      updateInventory();
      autoSave();
      showToast(`Đã thay thế ${count} ô thành công!`);
    } else {
      showToast('Không tìm thấy ô nào khớp với màu nguồn.');
    }
  }

  // =========================================================================
  // 11. BẢNG MÀU MARD & DANH SÁCH HẠT (INVENTORY / BILL OF MATERIALS)
  // =========================================================================
  function selectColor(bead) {
    state.currentColor = bead;

    // Cập nhật hiển thị màu đang chọn
    const swatch = $('active-color-swatch');
    const codeEl = $('active-color-code');
    const descEl = $('active-color-desc');

    if (bead) {
      swatch.classList.remove('is-empty');
      swatch.style.background = bead.h;
      codeEl.textContent = bead.c;
      descEl.textContent = bead.n;
    } else {
      swatch.classList.add('is-empty');
      swatch.style.background = '';
      codeEl.textContent = 'Ô TRỐNG';
      descEl.textContent = 'Trong suốt (Không xếp hạt)';
    }

    // Cập nhật nút active trong bảng palette
    $$('.color-btn').forEach(btn => {
      const btnCode = btn.dataset.code;
      if (!bead && btnCode === 'EMPTY') {
        btn.classList.add('selected');
      } else if (bead && btnCode === bead.c) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Cập nhật quick pick buttons
    const btnQEmpty = $('quick-empty');
    const btnQWhite = $('quick-white');
    if (btnQEmpty) btnQEmpty.classList.toggle('active', bead === null);
    if (btnQWhite) btnQWhite.classList.toggle('active', bead && bead.c === 'H02');
  }

  function renderPaletteGrid(filterGroup = 'ALL', searchQuery = '') {
    const container = $('palette-grid');
    if (!container) return;
    container.innerHTML = '';

    const query = searchQuery.trim().toUpperCase();

    // 1. Luôn có nút Ô TRỐNG đầu tiên
    const emptyBtn = document.createElement('button');
    emptyBtn.type = 'button';
    emptyBtn.className = 'color-btn btn-empty-cell' + (state.currentColor === null ? ' selected' : '');
    emptyBtn.dataset.code = 'EMPTY';
    emptyBtn.innerHTML = '<span>RỖNG</span>';
    emptyBtn.title = 'Ô trống / Trong suốt (Không có hạt)';
    emptyBtn.onclick = () => selectColor(null);
    container.appendChild(emptyBtn);

    // 2. Các hạt MARD
    MARD_PALETTE.forEach(bead => {
      if (filterGroup !== 'ALL' && bead.g !== filterGroup) return;
      if (query && !bead.c.includes(query) && !bead.n.toUpperCase().includes(query)) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'color-btn' +
        (bead.c === 'H02' ? ' btn-white-h02' : '') +
        (state.currentColor && state.currentColor.c === bead.c ? ' selected' : '');
      btn.dataset.code = bead.c;
      btn.style.background = bead.h;

      // Độ tương phản chữ
      const lum = 0.299 * bead.r + 0.587 * bead.g + 0.114 * bead.b;
      btn.style.color = lum > 140 ? '#0f172a' : '#ffffff';

      btn.innerHTML = `<span>${bead.c}</span>`;
      btn.title = `Mã: ${bead.c} - ${bead.n} (${bead.h})`;
      btn.onclick = () => selectColor(bead);
      container.appendChild(btn);
    });
  }

  function updateInventory() {
    const tableBody = $('inventory-table-body');
    const summaryCount = $('total-beads-count');
    const summaryColors = $('total-colors-count');
    const printTableBody = $('print-inventory-body');

    if (!tableBody) return;

    // Đếm số lượng hạt
    const counts = new Map();
    let totalBeads = 0;

    for (let i = 0; i < state.grid.length; i++) {
      const bead = state.grid[i];
      if (bead) {
        totalBeads++;
        counts.set(bead.c, {
          bead: bead,
          count: (counts.get(bead.c)?.count || 0) + 1
        });
      }
    }

    summaryCount.textContent = totalBeads.toLocaleString('vi-VN');
    summaryColors.textContent = counts.size;

    // Sắp xếp theo số lượng hạt giảm dần
    const list = [...counts.values()].sort((a, b) => b.count - a.count);

    tableBody.innerHTML = '';
    if (printTableBody) printTableBody.innerHTML = '';

    if (list.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:14px;">Chưa có hạt nào trên lưới.</td></tr>';
      return;
    }

    list.forEach(item => {
      const { bead, count } = item;
      const isHighlighted = state.highlightColor === bead.c;
      const bags500 = Math.ceil(count / 500);

      const tr = document.createElement('tr');
      tr.className = 'inventory-row' + (isHighlighted ? ' highlighted' : '');
      tr.title = 'Nhấp vào để soi sáng (highlight) các ô dùng màu này';

      tr.innerHTML = `
        <td>
          <span class="inventory-color-chip" style="background:${bead.h}"></span>
          <strong>${bead.c}</strong>
        </td>
        <td>${bead.n}</td>
        <td><strong>${count.toLocaleString('vi-VN')}</strong></td>
        <td><small class="badge-tip">${bags500} túi (500v)</small></td>
      `;

      tr.onclick = () => {
        // Bật/tắt chế độ soi sáng màu
        if (state.highlightColor === bead.c) {
          state.highlightColor = null;
          showToast(`Tắt soi sáng màu ${bead.c}`);
        } else {
          state.highlightColor = bead.c;
          showToast(`Đang soi sáng màu ${bead.c} (${count} hạt)`);
        }
        renderGrid();
        updateInventory();
      };

      tableBody.appendChild(tr);

      // Thêm vào bảng in ấn A4
      if (printTableBody) {
        const ptr = document.createElement('tr');
        ptr.innerHTML = `
          <td><span style="display:inline-block;width:14px;height:14px;background:${bead.h};border:1px solid #000;margin-right:4px;"></span><strong>${bead.c}</strong></td>
          <td>${bead.n}</td>
          <td><strong>${count}</strong> hạt</td>
          <td>${bags500} túi</td>
        `;
        printTableBody.appendChild(ptr);
      }
    });
  }

  // =========================================================================
  // 12. XUẤT ẢNH HD & IN ẤN & LƯU/NẠP FILE DỰ ÁN
  // =========================================================================
  function exportHighResImage() {
    if (!state.grid.length) return;

    // Tạo Canvas độ phân giải cao kèm chú thích để in hoặc lưu
    const cols = state.cols;
    const rows = state.rows;
    const cellPx = 36; // Kích thước lớn rõ nét
    const margin = 50;

    const exportCanvas = document.createElement('canvas');
    const width = margin * 2 + cols * cellPx;
    const height = margin * 2 + rows * cellPx + 100; // Thêm chỗ cho tiêu đề & chú thích
    exportCanvas.width = width;
    exportCanvas.height = height;

    const eCtx = exportCanvas.getContext('2d');
    eCtx.fillStyle = '#ffffff';
    eCtx.fillRect(0, 0, width, height);

    // Tiêu đề
    eCtx.fillStyle = '#0f172a';
    eCtx.font = '700 20px -apple-system, sans-serif';
    eCtx.textAlign = 'left';
    eCtx.fillText('Bản mẫu hạt ủi MARD (MARD Fuse Bead Pattern)', margin, 32);

    eCtx.font = '500 12px -apple-system, sans-serif';
    eCtx.fillStyle = '#64748b';
    eCtx.fillText(`Kích thước: ${cols}×${rows} ô | Số lượng hạt: ${$('total-beads-count').textContent} | Màu sắc: ${$('total-colors-count').textContent} màu`, margin, 48);

    // Thước đo
    eCtx.font = '600 11px -apple-system, sans-serif';
    eCtx.textAlign = 'center';
    eCtx.textBaseline = 'middle';
    eCtx.fillStyle = '#64748b';

    for (let c = 0; c < cols; c++) {
      eCtx.fillText(c + 1, margin + c * cellPx + cellPx / 2, margin - 12);
    }
    for (let r = 0; r < rows; r++) {
      eCtx.fillText(r + 1, margin - 18, margin + r * cellPx + cellPx / 2);
    }

    // Vẽ lưới hạt
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const bead = state.grid[idx];
        const cx = margin + c * cellPx;
        const cy = margin + r * cellPx;

        if (!bead) {
          drawCheckerboard(eCtx, cx, cy, cellPx, cellPx);
        } else {
          drawRealisticBead(eCtx, cx, cy, cellPx, bead);

          // Mã màu chữ
          eCtx.font = '700 11px -apple-system, sans-serif';
          eCtx.textAlign = 'center';
          eCtx.textBaseline = 'middle';
          const lum = 0.299 * bead.r + 0.587 * bead.g + 0.114 * bead.b;
          eCtx.fillStyle = lum > 140 ? '#0f172a' : '#ffffff';
          eCtx.fillText(bead.c, cx + cellPx / 2, cy + cellPx / 2);
        }
      }
    }

    // Viền lưới
    eCtx.strokeStyle = 'rgba(203, 213, 225, 0.7)';
    eCtx.lineWidth = 1;
    for (let c = 0; c <= cols; c++) {
      const x = margin + c * cellPx;
      eCtx.beginPath();
      eCtx.moveTo(x, margin);
      eCtx.lineTo(x, margin + rows * cellPx);
      eCtx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      const y = margin + r * cellPx;
      eCtx.beginPath();
      eCtx.moveTo(margin, y);
      eCtx.lineTo(margin + cols * cellPx, y);
      eCtx.stroke();
    }

    // Vạch đậm pegboard
    eCtx.strokeStyle = '#0f172a';
    eCtx.lineWidth = 2;
    for (let c = 0; c <= cols; c += 10) {
      const x = margin + c * cellPx;
      eCtx.beginPath();
      eCtx.moveTo(x, margin);
      eCtx.lineTo(x, margin + rows * cellPx);
      eCtx.stroke();
    }
    for (let r = 0; r <= rows; r += 10) {
      const y = margin + r * cellPx;
      eCtx.beginPath();
      eCtx.moveTo(margin, y);
      eCtx.lineTo(margin + cols * cellPx, y);
      eCtx.stroke();
    }

    // Tải về file PNG
    const link = document.createElement('a');
    link.download = `mau-hat-ui-mard-${cols}x${rows}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
    showToast('Đã tải ảnh mẫu lưới hạt HD về máy!');
  }

  function exportShoppingList() {
    const counts = new Map();
    for (let i = 0; i < state.grid.length; i++) {
      const bead = state.grid[i];
      if (bead) {
        counts.set(bead.c, {
          bead: bead,
          count: (counts.get(bead.c)?.count || 0) + 1
        });
      }
    }
    if (counts.size === 0) {
      showToast('Lưới chưa có hạt nào để xuất danh sách.');
      return;
    }

    const list = [...counts.values()].sort((a, b) => b.count - a.count);
    let text = `DANH SÁCH MUA HẠT ỦI MARD (${state.cols}x${state.rows} ô)\n`;
    text += `Tổng cộng: ${$('total-beads-count').textContent} hạt (${counts.size} màu)\n`;
    text += `------------------------------------\n`;
    text += `MÃ MÀU | TÊN MÀU              | SỐ LƯỢNG | ƯỚC TÍNH\n`;
    text += `------------------------------------\n`;

    list.forEach(item => {
      const { bead, count } = item;
      const bags = Math.ceil(count / 500);
      text += `${bead.c.padEnd(6)} | ${bead.n.padEnd(20)} | ${count.toString().padEnd(8)} | ${bags} túi (500v)\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast('Đã sao chép danh sách mua hạt vào Clipboard!');
    }).catch(() => {
      // Tải về file text
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = `danh-sach-mua-hat-mard.txt`;
      a.href = url;
      a.click();
      showToast('Đã tải danh sách mua hạt dạng file TXT!');
    });
  }

  function saveProjectToFile() {
    if (!state.grid.length) {
      showToast('Chưa có dữ liệu để lưu dự án.');
      return;
    }

    const projectData = {
      version: '1.0',
      appName: 'MARD Bead Art Maker',
      savedAt: new Date().toISOString(),
      cols: state.cols,
      rows: state.rows,
      grid: state.grid.map(b => b ? b.c : null)
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `du-an-hat-mard-${state.cols}x${state.rows}.json`;
    a.href = url;
    a.click();
    showToast('Đã lưu file dự án (.json) thành công!');
  }

  function loadProjectFromFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.cols || !data.rows || !Array.isArray(data.grid)) {
          throw new Error('Định dạng file không hợp lệ');
        }

        state.cols = data.cols;
        state.rows = data.rows;
        $('input-cols').value = data.cols;
        $('input-rows').value = data.rows;

        const map = new Map(MARD_PALETTE.map(b => [b.c, b]));
        state.grid = data.grid.map(code => code ? (map.get(code) || null) : null);

        state.history = [];
        state.historyIndex = -1;
        pushHistory();

        renderGrid();
        updateInventory();
        autoSave();
        showToast('Đã nạp dự án thành công!');
      } catch (err) {
        showToast('Không thể đọc file dự án này. Hãy kiểm tra lại file .json.');
      }
    };
    reader.readAsText(file);
  }

  function autoSave() {
    try {
      if (state.grid.length) {
        const serialized = {
          cols: state.cols,
          rows: state.rows,
          grid: state.grid.map(b => b ? b.c : null)
        };
        localStorage.setItem('mard_bead_autosave_v2', JSON.stringify(serialized));
      }
    } catch (e) { }
  }

  function restoreAutoSave() {
    try {
      const saved = localStorage.getItem('mard_bead_autosave_v2');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.cols && data.rows && Array.isArray(data.grid)) {
          state.cols = data.cols;
          state.rows = data.rows;
          $('input-cols').value = data.cols;
          $('input-rows').value = data.rows;

          const map = new Map(MARD_PALETTE.map(b => [b.c, b]));
          state.grid = data.grid.map(code => code ? (map.get(code) || null) : null);

          pushHistory();
          renderGrid();
          updateInventory();
          showToast('Đã tự động khôi phục bản vẽ lần trước trên máy của bạn!');
          return true;
        }
      }
    } catch (e) { }
    return false;
  }

  // =========================================================================
  // 13. CÁC CÔNG CỤ ĐIỀU KHIỂN & SỰ KIỆN GIAO DIỆN (EVENT LISTENERS)
  // =========================================================================
  function setTool(toolName) {
    state.currentTool = toolName;
    $$('.tool-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === toolName);
    });
    const viewport = $('canvas-viewport');
    if (viewport) {
      viewport.classList.toggle('mode-pan', toolName === 'pan');
    }
  }

  function initEvents() {
    // 1. Tải ảnh & Kéo thả (Drag & Drop)
    const fileInput = $('file-upload');
    const dropzone = $('dropzone');

    function handleFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        showToast('Vui lòng chọn một file ảnh hợp lệ (PNG, JPG, WEBP, v.v.)');
        return;
      }
      state.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          state.img = img;
          state.imgWidth = img.width;
          state.imgHeight = img.height;

          // Cập nhật thumbnail xem trước
          const thumbContainer = $('thumb-preview-container');
          thumbContainer.style.display = 'flex';
          $('thumb-img').src = img.src;
          $('thumb-name').textContent = file.name;
          $('thumb-dim').textContent = `${img.width}×${img.height} px`;

          // Tự động tính tỉ lệ ô nếu đang bật lock aspect
          if (state.lockAspect) {
            updateAspectRatioFromImage();
          }

          // Tự động tạo lưới hạt
          convertImageToGrid();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
      });
    }

    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
      });
    }

    // 2. Kích thước & Khóa tỉ lệ
    const inputCols = $('input-cols');
    const inputRows = $('input-rows');
    const btnLockAspect = $('btn-lock-aspect');

    function updateAspectRatioFromImage() {
      if (!state.img) return;
      const ratio = state.img.height / state.img.width;
      state.rows = Math.max(8, Math.min(100, Math.round(state.cols * ratio)));
      inputRows.value = state.rows;
    }

    if (inputCols) {
      inputCols.addEventListener('change', () => {
        state.cols = Math.max(8, Math.min(100, parseInt(inputCols.value) || 29));
        inputCols.value = state.cols;
        if (state.lockAspect && state.img) {
          updateAspectRatioFromImage();
        }
        if (state.img) convertImageToGrid();
      });
    }

    if (inputRows) {
      inputRows.addEventListener('change', () => {
        state.rows = Math.max(8, Math.min(100, parseInt(inputRows.value) || 29));
        inputRows.value = state.rows;
        if (state.img) convertImageToGrid();
      });
    }

    if (btnLockAspect) {
      btnLockAspect.addEventListener('click', () => {
        state.lockAspect = !state.lockAspect;
        btnLockAspect.classList.toggle('active', state.lockAspect);
        const lockIconSvg = $('lock-icon');
        if (lockIconSvg) {
          lockIconSvg.innerHTML = state.lockAspect
            ? '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
            : '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>';
        }
        showToast(state.lockAspect ? 'Đã khóa tỉ lệ theo ảnh gốc' : 'Đã mở khóa tỉ lệ tự do');
      });
    }

    // 3. Các nút preset kích thước chuẩn MARD Pegboard
    $$('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cols = parseInt(btn.dataset.cols);
        const rows = parseInt(btn.dataset.rows);
        state.cols = cols;
        state.rows = rows;
        inputCols.value = cols;
        inputRows.value = rows;
        state.lockAspect = false;
        if (btnLockAspect) btnLockAspect.classList.remove('active');

        if (state.img) convertImageToGrid();
      });
    });

    // 4. Xử lý nền & Tách màu trắng
    $$('input[name="bg-mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.bgMode = e.target.value;
        const tolContainer = $('tolerance-container');
        if (tolContainer) {
          tolContainer.style.display = state.bgMode === 'flood_white' ? 'flex' : 'none';
        }
        $$('.radio-card').forEach(c => c.classList.remove('selected'));
        e.target.closest('.radio-card').classList.add('selected');
        if (state.img) convertImageToGrid();
      });
    });

    const sliderTol = $('white-tolerance');
    if (sliderTol) {
      sliderTol.addEventListener('input', (e) => {
        state.whiteTolerance = parseInt(e.target.value);
        $('tol-val').textContent = state.whiteTolerance;
      });
      sliderTol.addEventListener('change', () => {
        if (state.img) convertImageToGrid();
      });
    }

    // Khung ảnh & Cắt viền
    const selectFit = $('select-fit');
    if (selectFit) {
      selectFit.addEventListener('change', (e) => {
        state.fitMode = e.target.value;
        if (state.img) convertImageToGrid();
      });
    }

    const checkTrim = $('check-trim');
    if (checkTrim) {
      checkTrim.addEventListener('change', (e) => {
        state.trimEmpty = e.target.checked;
        if (state.img) convertImageToGrid();
      });
    }

    // Dither & Max colors
    const checkDither = $('check-dither');
    if (checkDither) {
      checkDither.addEventListener('change', (e) => {
        state.dithering = e.target.checked;
        if (state.img) convertImageToGrid();
      });
    }

    const selectMaxColors = $('select-max-colors');
    if (selectMaxColors) {
      selectMaxColors.addEventListener('change', (e) => {
        state.maxColors = parseInt(e.target.value);
        if (state.img) convertImageToGrid();
      });
    }

    // Tương phản & Bão hòa
    const sliderContrast = $('slider-contrast');
    if (sliderContrast) {
      sliderContrast.addEventListener('input', (e) => {
        state.contrast = parseInt(e.target.value);
        $('contrast-val').textContent = state.contrast > 0 ? `+${state.contrast}` : state.contrast;
      });
      sliderContrast.addEventListener('change', () => {
        if (state.img) convertImageToGrid();
      });
    }

    // Nút Bắt đầu tạo lưới
    const btnGenerate = $('btn-generate');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', () => convertImageToGrid());
    }

    // 5. Thanh công cụ chỉnh sửa (Toolbar)
    $$('.tool-btn[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => setTool(btn.dataset.tool));
    });

    // Nút hoàn tác & làm lại
    $('btn-undo').addEventListener('click', undo);
    $('btn-redo').addEventListener('click', redo);

    // Chế độ xem: Hạt chân thực vs Vuông
    const btnToggleView = $('btn-toggle-view');
    if (btnToggleView) {
      btnToggleView.addEventListener('click', () => {
        state.viewMode = state.viewMode === 'realistic' ? 'flat' : 'realistic';
        const label = $('view-mode-label');
        if (label) {
          label.textContent = state.viewMode === 'realistic' ? 'Hạt tròn' : 'Ô vuông';
        }
        const svg = btnToggleView.querySelector('svg');
        if (svg) {
          svg.innerHTML = state.viewMode === 'realistic'
            ? '<circle cx="12" cy="12" r="9"/>'
            : '<rect x="3" y="3" width="18" height="18" rx="2"/>';
        }
        showToast(state.viewMode === 'realistic' ? 'Chế độ: Hạt tròn 3D chân thực' : 'Chế độ: Ô vuông phẳng');
        renderGrid();
      });
    }

    // Bật/tắt hiển thị mã màu
    const btnToggleCodes = $('btn-toggle-codes');
    if (btnToggleCodes) {
      btnToggleCodes.addEventListener('click', () => {
        state.showCodes = !state.showCodes;
        btnToggleCodes.classList.toggle('active', state.showCodes);
        renderGrid();
      });
    }

    // Kiểu vạch chia lưới
    const selectGridLines = $('select-grid-lines');
    if (selectGridLines) {
      selectGridLines.addEventListener('change', (e) => {
        state.gridLineStyle = e.target.value;
        renderGrid();
      });
    }

    // Chọn nhanh H02 (Trắng tinh) & Ô Trống
    $('quick-empty').addEventListener('click', () => selectColor(null));
    $('quick-white').addEventListener('click', () => {
      const h02 = MARD_PALETTE.find(p => p.c === 'H02');
      if (h02) selectColor(h02);
    });

    // 6. Phóng to / Thu nhỏ (Zoom)
    const canvasWrapper = $('canvas-wrapper');
    function setZoom(newZoom) {
      state.zoom = Math.max(0.5, Math.min(3.0, newZoom));
      canvasWrapper.style.transform = `scale(${state.zoom})`;
      $('zoom-val').textContent = `${Math.round(state.zoom * 100)}%`;
    }

    $('btn-zoom-in').addEventListener('click', () => setZoom(state.zoom + 0.2));
    $('btn-zoom-out').addEventListener('click', () => setZoom(state.zoom - 0.2));
    $('btn-zoom-reset').addEventListener('click', () => setZoom(1.0));

    // Cuộn chuột phóng to (Ctrl + Wheel)
    const viewport = $('canvas-viewport');
    viewport.addEventListener('wheel', (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setZoom(state.zoom + (e.deltaY < 0 ? 0.15 : -0.15));
      }
    }, { passive: false });

    // 7. Tabs Palette & Inventory
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        $$('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        $(`tab-${btn.dataset.tab}`).classList.add('active');
      });
    });

    // Lọc nhóm màu trong Palette
    $$('.group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.group-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPaletteGrid(btn.dataset.group, $('search-palette').value);
      });
    });

    const searchInput = $('search-palette');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const activeGroup = $('.group-btn.active')?.dataset.group || 'ALL';
        renderPaletteGrid(activeGroup, e.target.value);
      });
    }

    // 8. Xuất ảnh & In ấn & Dự án
    $('btn-export-png').addEventListener('click', exportHighResImage);
    $('btn-print').addEventListener('click', () => window.print());
    $('btn-copy-shopping').addEventListener('click', exportShoppingList);
    $('btn-save-project').addEventListener('click', saveProjectToFile);

    const projectFileInput = $('file-project-load');
    if (projectFileInput) {
      projectFileInput.addEventListener('change', (e) => {
        if (e.target.files.length) loadProjectFromFile(e.target.files[0]);
      });
    }

    // 9. Modal Thay thế màu hàng loạt (Replace Color Modal)
    const btnOpenReplace = $('btn-open-replace');
    const modalReplace = $('modal-replace');
    const btnCloseReplace = $('btn-close-replace');
    const btnExecuteReplace = $('btn-execute-replace');

    if (btnOpenReplace && modalReplace) {
      btnOpenReplace.addEventListener('click', () => {
        // Điền danh sách màu hiện có trên lưới vào select nguồn
        const selectSrc = $('replace-source');
        selectSrc.innerHTML = '<option value="EMPTY">Ô trống (Trong suốt)</option>';
        const counts = new Map();
        for (let i = 0; i < state.grid.length; i++) {
          const b = state.grid[i];
          if (b) counts.set(b.c, b);
        }
        counts.forEach(bead => {
          selectSrc.innerHTML += `<option value="${bead.c}">${bead.c} - ${bead.n}</option>`;
        });

        // Điền danh sách màu đích
        const selectDst = $('replace-target');
        selectDst.innerHTML = '<option value="EMPTY">Ô trống (Trong suốt)</option>';
        MARD_PALETTE.forEach(bead => {
          selectDst.innerHTML += `<option value="${bead.c}">${bead.c} - ${bead.n}</option>`;
        });
        if (state.currentColor) {
          selectDst.value = state.currentColor.c;
        }

        modalReplace.classList.add('open');
      });

      btnCloseReplace.addEventListener('click', () => modalReplace.classList.remove('open'));
      btnExecuteReplace.addEventListener('click', () => {
        const src = $('replace-source').value;
        const dstCode = $('replace-target').value;
        const dstColor = dstCode === 'EMPTY' ? null : MARD_PALETTE.find(b => b.c === dstCode);
        replaceColor(src, dstColor);
        modalReplace.classList.remove('open');
      });
    }

    // 10. Chuyển đổi giao diện Sáng / Tối (Theme toggle)
    const btnThemeToggle = $('btn-theme-toggle');
    const updateThemeIcon = (isDark) => {
      if (!btnThemeToggle) return;
      btnThemeToggle.innerHTML = isDark
        ? '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    };

    if (btnThemeToggle) {
      btnThemeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        updateThemeIcon(nextTheme === 'dark');
        localStorage.setItem('mard_theme', nextTheme);
      });
      // Khôi phục theme đã lưu
      const savedTheme = localStorage.getItem('mard_theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
      }
    }

    // Phím tắt bàn phím (Hotkeys)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 'b' || e.key === 'p') {
        setTool('pencil');
      } else if (e.key === 'g') {
        setTool('bucket');
      } else if (e.key === 'i') {
        setTool('picker');
      } else if (e.key === 'e') {
        setTool('eraser');
      }
    });
  }

  // =========================================================================
  // 14. KHỞI TẠO ỨNG DỤNG LẦN ĐẦU (INITIALIZATION)
  // =========================================================================
  function init() {
    renderPaletteGrid();
    selectColor(defaultWhite);
    initEvents();

    // Thử khôi phục bản lưu trước, nếu không có thì khởi tạo lưới trống 29x29
    if (!restoreAutoSave()) {
      state.grid = new Array(state.cols * state.rows).fill(null);
      pushHistory();
      renderGrid();
      updateInventory();
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
