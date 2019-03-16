<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Display extends CI_Controller {

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

		// $this->load->library('grocery_CRUD');
	}
	
	public function index()
	{
				// $this->load->view('welcome_message');

		$output['content'] = "test";
		$output['main_title'] = "Data Pabrik Astra Agro Lestari";
		
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

			base_url("assets/mdp/pabrik.js"),
		];
		
		$output['content'] = '';
		
		$this->load->view('header',$header);
		$this->load->view('content-pabrik',$output);
		$this->load->view('footer',$footer);
	}

	public function load()
	{
		$query = $this->db->query("SELECT nama,tipe FROM master_pabrik;");

		$i = 0;
		$d = [];
		foreach ($query->result() as $row)
		{
			$d[$i][0] = $row->nama; // access attributes
			$d[$i++][1] = $row->tipe; // or methods defined on the 'User' class
		}
		echo json_encode($d);

	}

	public function simpan()
	{
		$this->db->query("TRUNCATE TABLE `master_pabrik`");
		$data_json = $_REQUEST['data_json'];
		$data = json_decode($data_json);
		foreach ($data as $key => $value) {
			// $this->db->insert
			$data = array(
				'nama' => $value[0],
				'tipe' => $value[1],
				// 'date' => 'My date'
			);
			// print_r($data);
			$this->db->insert('master_pabrik', $data);
		}
	}

	public function proses(){
		$output = "";

        $output['taksasi_t'] = '';
        $output['start_t'] = '';
        $output['jam_t'] = '';

        $output['ffa_hi'] = '';
        $output['ffa_shi'] = '';
        $output['taksasi_y'] = '';
        $output['taksasi_vs_real'] = '';

        $output['er_cpo_hi'] = '';
        $output['er_cpo_shi'] = '';

        $output['tbs_terima_hi'] = '';
        $output['tbs_terima_shi'] = '';

        $output['tbs_olah_hi'] = '';
        $output['tbs_olah_shi'] = '';

        $output['er_kernel_hi'] = '';
        $output['er_kernel_shi'] = '';

        $output['throughput_hi'] = '';
        $output['throughput_shi'] = '';

        $output['throughput_hi'] = '';
        $output['throughput_shi'] = '';

        $output['breakdown_hi'] = '';
        $output['breakdown_shi'] = '';

        $output['er_pko_hi'] = '';
        $output['er_pko_shi'] = '';

        $output['stok_cpo'] = '';
        $output['stok_kernel'] = '';

        $output['stok_pko'] = '';
        $output['stok_pke'] = '';
		

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


		$this->load->view('display-proses',$output);
	
	}

	public function tbs_olah(){
		$pabrik = $_REQUEST['pabrik'];
		$tanggal = $_REQUEST['tanggal'];

		$query = $this->db->query("SELECT tbs_olah FROM o_feedback_olah WHERE id_pabrik = '$pabrik' AND tanggal = '$tanggal';");

		
	}

	public function maintenance(){
		$output = "";

		$this->load->view('display-maintenance',$output);
	}


}
