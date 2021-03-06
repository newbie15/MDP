<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lkpmp extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct()
	{
		parent::__construct();

		$this->load->database();
		$this->load->helper('url');

		$this->load->library('grocery_CRUD');
	}
	
	public function index()
	{	
		$output['content'] = "test";
		$output['main_title'] = "LKPMP";
		
		$header['css_files'] = [
			base_url("assets/jexcel/css/jquery.jexcel.css"),
			base_url("assets/jexcel/css/jquery.jcalendar.css"),
		];

		$footer['js_files'] = [
			// base_url('assets/adminlte/plugins/jQuery/jQuery-2.1.4.min.js'),
			base_url("assets/jexcel/js/jquery.jexcel.js"),
			base_url("assets/jexcel/js/jquery.jcalendar.js"),
			base_url("assets/mdp/config.js"),
			base_url("assets/mdp/global.js"),
			base_url("assets/mdp/lkpmp.js"),
		];
		
		$output['content'] = '';
		
		$nama_pabrik = $this->session->user;
		$kategori = $this->session->kategori;

		$query = $this->db->query("SELECT nama FROM master_pabrik;");

		$output['dropdown_pabrik']= "";
		if($kategori<2){
			$output['dropdown_pabrik']= "<select id=\"pabrik\">";
		}else{
			$output['dropdown_pabrik']= "<select id=\"pabrik\" disabled>";
		}
		
		foreach ($query->result() as $row)
		{
			if($nama_pabrik==$row->nama){
				$output['dropdown_pabrik'] = $output['dropdown_pabrik']."<option selected=\"selected\">".$row->nama."</option>";
			}else{
				$output['dropdown_pabrik'] = $output['dropdown_pabrik']."<option>".$row->nama."</option>";
			}
		}
		$output['dropdown_pabrik'] .= "/<select>";		

		$output['dropdown_station'] = "<select id=\"station\"></select>";

				
		$this->load->view('header',$header);
		$this->load->view('content-lkpmp',$output);
		$this->load->view('footer',$footer);
	}

	public function load()
	{
		$id_pabrik = $_REQUEST['id_pabrik'];
		$tahun = $_REQUEST['tahun'];
		$bulan = $_REQUEST['bulan'];

		$query = $this->db->query("SELECT id_station,id_unit,kondisi,status,identifikasi,perbaikan,pic,status_sparepart,keterangan FROM m_lkpmp where id_pabrik = '$id_pabrik' AND tahun='$tahun' AND bulan='$bulan';");

		$i = 0;
		$d = [];
		foreach ($query->result() as $row)
		{
			// $d[$i][0] = $row->nama; // access attributes
			$d[$i][0] = $row->id_station; // or methods defined on the 'User' class
			$d[$i][1] = $row->id_unit; // or methods defined on the 'User' class
			$d[$i][2] = $row->kondisi; // or methods defined on the 'User' class
			$d[$i][3] = $row->status; // or methods defined on the 'User' class
			$d[$i][4] = $row->identifikasi; // or methods defined on the 'User' class
			$d[$i][5] = $row->perbaikan; // or methods defined on the 'User' class
			$d[$i][6] = $row->pic; // or methods defined on the 'User' class
			$d[$i][7] = $row->status_sparepart; // or methods defined on the 'User' class
			$d[$i++][8] = $row->keterangan; // or methods defined on the 'User' class
		}
		echo json_encode($d);
	}

	public function simpan()
	{
		$pabrik = $_REQUEST['pabrik'];
		$tahun = $_REQUEST['tahun'];
		$bulan = $_REQUEST['bulan'];

		$this->db->query("DELETE FROM `m_lkpmp` where id_pabrik = '$pabrik' AND tahun='$tahun' AND bulan='$bulan';");
		$data_json = $_REQUEST['data_json'];
		$data = json_decode($data_json);
		foreach ($data as $key => $value) {
			// $this->db->insert
			$data = array(
				'id_pabrik' => $pabrik,
				'tahun' => $tahun,
				'bulan' => $bulan,
				'id_station' => $value[0],
				'id_unit' => $value[1],
				'kondisi' => $value[2],
				'status' => $value[3],
				'identifikasi' => $value[4],
				'perbaikan' => $value[5],
				'pic' => $value[6],
				'status_sparepart' => $value[7],
				'keterangan' => $value[8],
				// 'date' => 'My date'
			);
			// print_r($data);
			if($value[0]!=""){
				$this->db->insert('m_lkpmp', $data);
			}
		}
	}

}
