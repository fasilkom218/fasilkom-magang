import React from 'react'
import { useSelector } from 'react-redux'

const TableNilaiMhs = ({ item }) => {
    return (
        <div className='overflow-x-auto'>
            <table className='table'>
                <thead className='bg-black text-white text-lg font-bold'>
                    <tr>
                        <th>No</th>
                        <th>Unsur Penilaian</th>
                        <th>Bobot</th>
                        <th>Nilai</th>
                        <th>Bobot x Nilai</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>KEDISIPLINAN</td>
                        <td>30%</td>
                        <td>{item.Nilai.disiplin + item.Nilai.sikap + item.Nilai.tanggung_jawab + item.Nilai.kehadiran + item.Nilai.tata_tertib + item.Nilai.penampilan}</td>
                        <td>{item.disiplin + item.sikap + item.tanggung_jawab + item.kehadiran + item.tata_tertib + item.penampilan}</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Ketepatan waktu / disiplin</td>
                        <td>5%</td>
                        <td>{item.Nilai.disiplin}</td>
                        <td>{item.disiplin}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sikap kerja / prosedur kerja</td>
                        <td>5%</td>
                        <td>{item.Nilai.sikap}</td>
                        <td>{item.sikap}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Tanggung jawab terhadap tugas</td>
                        <td>5%</td>
                        <td>{item.Nilai.tanggung_jawab}</td>
                        <td>{item.tanggung_jawab}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Kehadiran</td>
                        <td>5%</td>
                        <td>{item.Nilai.kehadiran}</td>
                        <td>{item.kehadiran}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Mematuhi aturan dan tata tertib magang</td>
                        <td>5%</td>
                        <td>{item.Nilai.tata_tertib}</td>
                        <td>{item.tata_tertib}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Penampilan / kerapihan</td>
                        <td>5%</td>
                        <td>{item.Nilai.penampilan}</td>
                        <td>{item.penampilan}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>PRESTASI KERJA</td>
                        <td>15%</td>
                        <td>{item.Nilai.kemampuan_kerja + item.Nilai.keterampilan_kerja + item.Nilai.kualitas_kerja}</td>
                        <td>{item.kemampuan_kerja + item.keterampilan_kerja + item.kualitas_kerja}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Kemampuan kerja</td>
                        <td>5%</td>
                        <td>{item.Nilai.kemampuan_kerja}</td>
                        <td>{item.kemampuan_kerja}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Keterampilan kerja</td>
                        <td>5%</td>
                        <td>{item.Nilai.keterampilan_kerja}</td>
                        <td>{item.keterampilan_kerja}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Kualitas hasil kerja</td>
                        <td>5%</td>
                        <td>{item.Nilai.kualitas_kerja}</td>
                        <td>{item.kualitas_kerja}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>KEMAMPUAN BERADAPTASI</td>
                        <td>20%</td>
                        <td>{item.Nilai.kemampuan_berkomunikasi + item.Nilai.kerjasama + item.Nilai.kerajinan + item.Nilai.percaya_diri}</td>
                        <td>{(item.kemampuan_berkomunikasi + item.kerjasama + item.kerajinan + item.percaya_diri).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Kemampuan berkomunikasi</td>
                        <td>5%</td>
                        <td>{item.Nilai.kemampuan_berkomunikasi}</td>
                        <td>{item.kemampuan_berkomunikasi}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>Kerjasama</td>
                        <td>5%</td>
                        <td>{item.Nilai.kerjasama}</td>
                        <td>{item.kerjasama}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>Kerajinan / inisiatif</td>
                        <td>5%</td>
                        <td>{item.Nilai.kerajinan}</td>
                        <td>{item.kerajinan}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>Memiliki rasa percaya diri</td>
                        <td>5%</td>
                        <td>{item.Nilai.percaya_diri}</td>
                        <td>{item.percaya_diri}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>LAPORAN MAGANG</td>
                        <td>35%</td>
                        <td>{item.Nilai.relevansi + item.Nilai.isi_laporan}</td>
                        <td>{item.relevansi + item.isi_laporan}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>Relevansi Laporan</td>
                        <td>10%</td>
                        <td>{item.Nilai.relevansi}</td>
                        <td>{item.relevansi}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>Isi Laporan</td>
                        <td>25%</td>
                        <td>{item.Nilai.isi_laporan}</td>
                        <td>{item.isi_laporan}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={4}>NILAI TOTAL</td>
                        <td>{item.total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableNilaiMhs
