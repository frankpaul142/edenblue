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
        if (isset($_POST['ContactForm'])) {
            $model->attributes = $_POST['ContactForm'];
            if ($model->validate()) {
                $name = '=?UTF-8?B?' . base64_encode($model->name) . '?=';
                $subject = '=?UTF-8?B?' . base64_encode($model->subject) . '?=';
                $headers = "From: $name <{$model->email}>\r\n" .
                        "Reply-To: {$model->email}\r\n" .
                        "MIME-Version: 1.0\r\n" .
                        "Content-Type: text/plain; charset=UTF-8";

                mail(Yii::app()->params['adminEmail'], $subject, $model->body, $headers);
                Yii::app()->user->setFlash('contact', 'Thank you for contacting us. We will respond to you as soon as possible.');
                $this->refresh();
            }
        }
        $this->render('contact', array('model' => $model));
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
            if ($model->validate() && $model->login())
                $this->redirect(Yii::app()->user->returnUrl);
            else
                $this->redirect(Yii::app()->user->returnUrl.'#login/error');
        }
        // display the login form
        //$this->render('login', array('model' => $model));
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
                $user->name=$_POST['name'];
                $user->lastname=$_POST['lastname'];
                $user->email=$_POST['email'];
                $user->password=hash("sha256", $_POST['password']);
                if(isset($_POST['tel'])){
                    $user->phone=$_POST['tel'];
                }
                $user->creation_date=date("Y-m-d H:i:s");
                $user->status='ACTIVE';
                if($user->save()){
                    $this->redirect(Yii::app()->request->baseUrl);
                }
                else{
                    echo print_r($user->getErrors());
                }
            }
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
                $photos['source'] = $photo->source;
                array_push($service['photos'], $photos);
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
            $room['photos'] = [];
            foreach ($r->photos as $photo) {
                $photos['source'] = $photo->source;
                array_push($room['photos'], $photos);
            }
            array_push($return, $room);
        }
        echo CJSON::encode($return);
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
