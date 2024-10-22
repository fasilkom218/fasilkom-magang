import React from 'react'
import { useSelector } from 'react-redux'

const TableNilai = () => {
    const { nilai } = useSelector(state => state.nilai)
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
                        <td>{nilai.Nilai.disiplin + nilai.Nilai.sikap + nilai.Nilai.tanggung_jawab + nilai.Nilai.kehadiran + nilai.Nilai.tata_tertib + nilai.Nilai.penampilan}</td>
                        <td>{(nilai.disiplin + nilai.sikap + nilai.tanggung_jawab + nilai.kehadiran + nilai.tata_tertib + nilai.penampilan).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Ketepatan waktu / disiplin</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.disiplin}</td>
                        <td>{nilai.disiplin}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sikap kerja / prosedur kerja</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.sikap}</td>
                        <td>{nilai.sikap}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Tanggung jawab terhadap tugas</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.tanggung_jawab}</td>
                        <td>{nilai.tanggung_jawab}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Kehadiran</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.kehadiran}</td>
                        <td>{nilai.kehadiran}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Mematuhi aturan dan tata tertib magang</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.tata_tertib}</td>
                        <td>{nilai.tata_tertib}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Penampilan / kerapihan</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.penampilan}</td>
                        <td>{nilai.penampilan}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>PRESTASI KERJA</td>
                        <td>15%</td>
                        <td>{nilai.Nilai.kemampuan_kerja + nilai.Nilai.keterampilan_kerja + nilai.Nilai.kualitas_kerja}</td>
                        <td>{(nilai.kemampuan_kerja + nilai.keterampilan_kerja + nilai.kualitas_kerja).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Kemampuan kerja</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.kemampuan_kerja}</td>
                        <td>{nilai.kemampuan_kerja}</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Keterampilan kerja</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.keterampilan_kerja}</td>
                        <td>{nilai.keterampilan_kerja}</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>Kualitas hasil kerja</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.kualitas_kerja}</td>
                        <td>{nilai.kualitas_kerja}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>KEMAMPUAN BERADAPTASI</td>
                        <td>20%</td>
                        <td>{nilai.Nilai.kemampuan_berkomunikasi + nilai.Nilai.kerjasama + nilai.Nilai.kerajinan + nilai.Nilai.percaya_diri}</td>
                        <td>{(nilai.kemampuan_berkomunikasi + nilai.kerjasama + nilai.kerajinan + nilai.percaya_diri).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Kemampuan berkomunikasi</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.kemampuan_berkomunikasi}</td>
                        <td>{nilai.kemampuan_berkomunikasi}</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>Kerjasama</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.kerjasama}</td>
                        <td>{nilai.kerjasama}</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td>Kerajinan / inisiatif</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.kerajinan}</td>
                        <td>{nilai.kerajinan}</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td>Memiliki rasa percaya diri</td>
                        <td>5%</td>
                        <td>{nilai.Nilai.percaya_diri}</td>
                        <td>{nilai.percaya_diri}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={2}>LAPORAN MAGANG</td>
                        <td>35%</td>
                        <td>{nilai.Nilai.relevansi + nilai.Nilai.isi_laporan}</td>
                        <td>{(nilai.relevansi + nilai.isi_laporan).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td>Relevansi Laporan</td>
                        <td>10%</td>
                        <td>{nilai.Nilai.relevansi}</td>
                        <td>{nilai.relevansi}</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>Isi Laporan</td>
                        <td>25%</td>
                        <td>{nilai.Nilai.isi_laporan}</td>
                        <td>{nilai.isi_laporan}</td>
                    </tr>
                    <tr className='bg-slate-300 text-lg font-bold'>
                        <td colSpan={4}>NILAI TOTAL</td>
                        <td>{nilai.total}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableNilai
