<?php

class SiteController extends Controller {

    /**
     * Declares class-based actions.
     */
    public function actions() {
        return array(
            // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha' => array(
                'class' => 'CCaptchaAction',
                'backColor' => 0xFFFFFF,
            ),
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page' => array(
                'class' => 'CViewAction',
            ),
        );
    }

    /**
     * This is the default 'index' action that is invoked
     * when an action is not explicitly requested by users.
     */
    public function actionIndex() {
        $this->render('index');
    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError() {
        if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }

    /**
     * Displays the contact page
     */
    public function actionContact() {
        $model = new ContactForm;
        if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['body'])) {
            $model->name = $_POST['name'];
            $model->email = $_POST['email'];
            $model->subject = $_POST['subject'];
            $model->body = $_POST['body'];
            if ($model->validate()) {
                $name = '=?UTF-8?B?' . base64_encode($model->name) . '?=';
                $subject = '=?UTF-8?B?' . base64_encode($model->subject) . '?=';
                $headers = "From: $name <{$model->email}>\r\n" .
                        "Reply-To: {$model->email}\r\n" .
                        "MIME-Version: 1.0\r\n" .
                        "Content-Type: text/plain; charset=UTF-8";

                mail(Yii::app()->params['adminEmail'], $subject, $model->body, $headers);
                $this->redirect(Yii::app()->request->baseUrl.'#contacto/enviado');
            }
            else{
                $this->redirect(Yii::app()->request->baseUrl.'#contacto/error');
            }
        }
        else{
            $this->redirect(Yii::app()->request->baseUrl.'#contacto/error');
        }
    }

    /**
     * Displays the login page
     */
    public function actionLogin() {
        $model = new LoginForm;

        // collect user input data
        if (isset($_POST['email']) && isset($_POST['password'])) {
            $model->username = $_POST['email'];
            $model->password = $_POST['password'];
            if(isset($_POST['remember_me']))
                $model->rememberMe = 1;
            else
                $model->rememberMe = 0;
            // validate user input and redirect to the previous page if valid
            if ($model->validate() && $model->login()){
                $url=Yii::app()->user->returnUrl;
                if(isset($_POST['redirect']) && $_POST['redirect']=="rp"){
                    $url.='#pagar';
                }
                $this->redirect($url);
            }
            else
                $this->redirect(Yii::app()->user->returnUrl.'#login/error');
        }
    }

    /**
     * Logs out the current user and redirect to homepage.
     */
    public function actionLogout() {
        Yii::app()->user->logout();
        $this->redirect(Yii::app()->homeUrl);
    }

    public function actionSignup()
    {
        $user= new User;
        if(isset($_POST['name']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['password'])){
            if($_POST['password']===$_POST['password2']){
                $user->email=$_POST['email'];
                $aux = User::model()->find('email=?', array($user->email));
                if($aux === NULL){
                    $user->name=$_POST['name'];
                    $user->lastname=$_POST['lastname'];
                    $user->password=hash("sha256", $_POST['password']);
                    if(isset($_POST['tel'])){
                        $user->phone=$_POST['tel'];
                    }
                    $user->creation_date=date("Y-m-d H:i:s");
                    $user->status='ACTIVE';
                    if($user->save()){
                        $model = new LoginForm;
                        $model->username=$user->email;
                        $model->password=$_POST['password'];
                        if($model->login()){
                            $url=Yii::app()->user->returnUrl;
                            if(isset($_POST['redirect']) && substr($_POST['redirect'],1,2)=='rr'){
                                $url.='#pagar';
                            }
                            $this->redirect($url);
                        }
                        else{
                            $this->redirect(Yii::app()->request->baseUrl.'#registro/errorlogin');
                        }
                    }
                    else{
                        $this->redirect(Yii::app()->request->baseUrl.'#registro/error');
                    }
                }
                else{
                    $this->redirect(Yii::app()->request->baseUrl.'#registro/yaexiste');
                }
            }
            else{
                $this->redirect(Yii::app()->request->baseUrl.'#registro/nocoinciden');
            }
        }
    }

    public function actionBook()
    {
        if(isset($_POST['llegada']) && isset($_POST['salida']) && isset($_POST['maxPersonas']) && isset($_POST['habitaciones']) && isset($_POST['habitacion']) && isset($_POST['total']) && isset($_POST['room'])){
            Yii::app()->session['llegada']=$_POST['llegada'];
            Yii::app()->session['salida']=$_POST['salida'];
            Yii::app()->session['maxPersonas']=$_POST['maxPersonas'];
            Yii::app()->session['habitaciones']=$_POST['habitaciones'];
            Yii::app()->session['habitacion']=$_POST['habitacion'];
            Yii::app()->session['total']=$_POST['total'];
            if(isset(Yii::app()->user->id)){
            	$reservation=new Reservation;
            	$reservation->user_id=Yii::app()->user->id;
            	$reservation->arrival_date=date('Y-m-d',strtotime($_POST['llegada']));
            	$reservation->departure_date=date('Y-m-d',strtotime($_POST['salida']));
            	$reservation->number_people=$_POST['maxPersonas'];
            	$reservation->booked_date=date('Y-m-d H:i:s');
            	$reservation->status='CREATED';
            	$reservation->total=$_POST['total'];
            	if($reservation->save()){
                    $error=false;
                    $rooms=[];
                    foreach (TypeRoom::model()->findAll() as $i => $type) {
                    	$rooms[$type->id]=0;
                    }
                    foreach ($_POST['room'] as $i => $room) {
                    	$rooms[$room]++;
                    }
                    foreach ($rooms as $i => $room) {
                    	if($room>0){
	                    	$rooms_booked=new RoomsBooked;
	                        $rooms_booked->reservation_id=$reservation->id;
	                        $rooms_booked->type_room_id=$i;
	                        $rooms_booked->quantity=$room;
	                        if(!$rooms_booked->save()){
	                            $error=true;
	                            break;
	                        }
	                    }
                    }
                    if(!$error){
    	                $this->redirect(Yii::app()->request->baseUrl.'#pagar');
                    }
                    else{
                    	$this->redirect(Yii::app()->request->baseUrl.'#reservar');
                    }
	            }
            }
            else{
                $this->redirect(Yii::app()->request->baseUrl.'#login/rp');
            }
        }
        else{
            $this->redirect(Yii::app()->request->baseUrl.'#reservar');
        }
    }

    public function actionPay($id)
    {
    	$reservation=Reservation::model()->findByPk($id);
    	if (isset($reservation)) {
    		Yii::app()->session['llegada']=$reservation->arrival_date;
            Yii::app()->session['salida']=$reservation->departure_date;
            Yii::app()->session['maxPersonas']=$reservation->number_people;
            Yii::app()->session['total']=$reservation->total;
            $count=0;
            $habitacion=[];
            foreach (RoomsBooked::model()->findAllByAttributes(array('reservation_id'=>$reservation->id)) as $i => $rb) {
            	$count+=$rb->quantity;
            	for ($i=0; $i < $rb->quantity; $i++) { 
            		$n='room_'.TypeRoom::model()->findByPk($rb->type_room_id)->name.'_name';
            		array_push($habitacion, Yii::t('rooms',$n));
            	}
            }
            Yii::app()->session['habitacion']=$habitacion;
            Yii::app()->session['habitaciones']=$count;
    		$this->redirect(Yii::app()->request->baseUrl.'#pagar');
    	}
    	else{
    		$this->redirect(Yii::app()->request->baseUrl.'#cuenta');
    	}
    }

    public function actionLoadServices() {
        $services = Service::model()->findAll(array("condition" => "status='ACTIVE'"));
        $return = [];
        $service = [];
        $photos = [];
        foreach ($services as $i => $s) {
            $service['id'] = $s->id;
            $n='service_'.$s->title.'_title';
            $d='service_'.$s->title.'_description';
            $service['title'] = Yii::t('services',$n);
            $service['description'] = Yii::t('services',$d);
            $service['photos'] = [];
            foreach ($s->photos as $photo) {
                if($photo->status=='ACTIVE'){
                    $photos['source'] = $photo->source;
                    array_push($service['photos'], $photos);
                }
            }
            array_push($return, $service);
        }
        echo CJSON::encode($return);
    }

    public function actionLoadTypeRooms() {
        $rooms = TypeRoom::model()->findAll();
        $return = [];
        $room = [];
        $photos = [];
        foreach ($rooms as $i => $r) {
            $room['id'] = $r->id;
            $n='room_'.$r->name.'_name';
            $d='room_'.$r->name.'_description';
            $room['name']=Yii::t('rooms',$n);
            $room['description']=Yii::t('rooms',$d);
            $room['price']=$r->price1;
            $room['capacity']=$r->capacity;
            $room['photos'] = [];
            foreach ($r->photos as $photo) {
                if($photo->status=='ACTIVE'){
                    $photos['source'] = $photo->source;
                    array_push($room['photos'], $photos);
                }
            }
            array_push($return, $room);
        }
        echo CJSON::encode($return);
    }

    public function actionLoadEcosystem() {
        $ecosystem=[];
        $ecosystem['title']=Yii::t('static','static_Ecosistema_title');
        $ecosystem['description']=Yii::t('static','static_Ecosistema_description');
		$photos=[];
        foreach (Photo::model()->findAllByAttributes(array('service_id'=>10)) as $i => $photo) {
        	$p=[];
        	if($photo->status=='ACTIVE'){
                $p['source'] = $photo->source;
                array_push($photos, $p);
            }
        }
        $ecosystem['photos']=$photos;
        echo json_encode($ecosystem);
    }

    public function actionLoadAccount() {
    	$user=User::model()->findByPk(Yii::app()->user->id);
    	if(isset($user)){
    		$account=[];
    		$account['id']=$user->id;
    		$account['name']=$user->name;
    		$account['lastname']=$user->lastname;
            $reservations=[];
            foreach ($user->reservations as $i => $reservation) {
                $r=[];
                $r['id']=$reservation->id;
                $r['arrival_date']=$reservation->arrival_date;
                $r['departure_date']=$reservation->departure_date;
                $r['number_people']=$reservation->number_people;
                $r['booked_date']=$reservation->booked_date;
                $r['total']=$reservation->total;
                switch ($reservation->status) {
                    case 'CREATED':
                        $r['status']='Creada.';
                        break;
                    case 'CANCELED':
                        $r['status']='Cancelada.';
                        break;
                    case 'CONSUMED':
                        $r['status']='Consumida: Gracias por preferirnos.';
                        break;
                    case 'PAID':
                        $r['status']='Pagada: Ahora puedes dirigirte a nuestras instalaciones.';
                        break;
                    case 'ERROR':
                        $r['status']='Error: Lo sentimos, inténtalo nuevamente.';
                        break;
                }
                array_push($reservations, $r);
            }
            $account['reservations']=$reservations;
    		echo json_encode($account);
    	}
    }

    public function actionSetLanguage()
    {
        if (isset($_POST['language']))
            Yii::app()->user->setState('applicationLanguage',$_POST['language']);
        $this->redirect($_POST['url']);
    }

    public function actionTranslate()
    {
        $rooms = TypeRoom::model()->findAll();
        $sqlsm="";
        $sqlm="";
        $i=0;
        foreach ($rooms as $r) {
            $sqlsm.="insert into `sourcemessage` values (".$i.",'rooms','room_".htmlentities($r->name, ENT_QUOTES,'UTF-8')."_name');<br>";
            $sqlm.="insert into `message` values (".$i.",'es','".htmlentities($r->name, ENT_QUOTES,'UTF-8')."');<br>";
            $sqlm.="insert into `message` values (".$i++.",'en','');<br>";
            $sqlsm.="insert into `sourcemessage` values (".$i.",'rooms','room_".htmlentities($r->name, ENT_QUOTES,'UTF-8')."_description');<br>";
            $sqlm.="insert into `message` values (".$i.",'es','".htmlentities($r->description, ENT_QUOTES,'UTF-8')."');<br>";
            $sqlm.="insert into `message` values (".$i++.",'en','');<br>";
        }
        echo $sqlsm;
        echo $sqlm;
        echo "<br>";
        $services = Service::model()->findAll();
        $sqlsm="";
        $sqlm="";
        foreach ($services as $s) {
            $sqlsm.="insert into `sourcemessage` values (".$i.",'services','service_".htmlentities($s->title, ENT_QUOTES,'UTF-8')."_title');<br>";
            $sqlm.="insert into `message` values (".$i.",'es','".htmlentities($s->title, ENT_QUOTES,'UTF-8')."');<br>";
            $sqlm.="insert into `message` values (".$i++.",'en','');<br>";
            if(!is_null($s->description)){
                $sqlsm.="insert into `sourcemessage` values (".$i.",'services','service_".htmlentities($s->title, ENT_QUOTES,'UTF-8')."_description');<br>";
                $sqlm.="insert into `message` values (".$i.",'es','".htmlentities($s->description, ENT_QUOTES,'UTF-8')."');<br>";
                $sqlm.="insert into `message` values (".$i++.",'en','');<br>";
            }
        }
        echo $sqlsm;
        echo $sqlm;
    }

}
