  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Activity Maintenance
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li>Activity Maintenance</li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <?php  ?>
        <div class="col-xs-12">
          Pabrik : 
          <?php echo $dropdown_pabrik ?>
          Tahun : 
          <select id="tahun">
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
          </select>
          Bulan : 
          <select id="bulan">
            <option value="01">januari</option>
            <option value="02">februari</option>
            <option value="03">maret</option>
            <option value="04">april</option>
            <option value="05">mei</option>
            <option value="06">juni</option>
            <option value="07">juli</option>
            <option value="08">agustus</option>
            <option value="09">september</option>
            <option value="10">oktober</option>
            <option value="11">november</option>
            <option value="12">desember</option>
          </select>
          Tanggal : 
          <select id="tanggal">
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
          </select>
          <br><br>
        </div>
        <!-- <div class="col-xs-12"> -->
          <div class="col-xs-10">
            <input class="form-control" type="text" name="wo" id="wo" autocomplete="off" placeholder="cari workorder disini"/>        
          </div>
          <div class="col-xs-2">
            <button class="btn btn-success" id="tambah">Tambah</button>
          </div>
          <br>
        <!-- </div> -->
        <div class="col-xs-6">
          <br>
          <div style="
						height: 410px;
						width: 100%;
						overflow: auto;
					">
            <div id='my-spreadsheet'></div>      
          </div>
        </div>
        <div class="col-xs-6" id="side-note">
          <br>          
          <div style="
						height: 410px;
						width: 100%;
						overflow: auto;
					">
            <div id="keterangan">
              Station<br>
              Unit<br>
              Problem<br>
              Desc masalah 
            </div>
            <br>
            <div id='my-spreadsheet2'></div>      
          </div>
        </div>
      </div>
      <button id="simpan">Simpan</button>

      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
