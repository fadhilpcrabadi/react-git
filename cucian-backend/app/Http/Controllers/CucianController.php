<?php
namespace App\Http\Controllers;

use App\Models\Cucian;
use Illuminate\Http\Request;

class CucianController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Cucian::oldest()->get()]);
    }

    public function store(Request $request)
    {
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('foto', 'public');
        }

        $cucian = Cucian::create([
            'nama_pelanggan' => $request->nama_pelanggan,
            'no_kendaraan' => $request->no_kendaraan,
            'jenis_layanan' => $request->jenis_layanan,
            'foto' => $fotoPath,
        ]);

        return response()->json(['data' => $cucian], 201);
    }

    public function update(Request $request, $id)
    {
        $cucian = Cucian::findOrFail($id);
        $cucian->update($request->only(['status']));
        return response()->json(['data' => $cucian]);
    }

    public function destroy($id)
    {
        Cucian::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}