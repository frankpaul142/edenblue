<?php

/**
 * This is the model class for table "reservation".
 *
 * The followings are the available columns in table 'reservation':
 * @property integer $id
 * @property integer $user_id
 * @property string $arrival_date
 * @property string $departure_date
 * @property integer $number_people
 * @property string $booked_date
 * @property string $status
 * @property double $total
 * @property string $payment_date
 * @property string $note
 *
 * The followings are the available model relations:
 * @property User $user
 * @property TypeRoom[] $typeRooms
 */
class Reservation extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'reservation';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id, arrival_date, number_people, booked_date, status, total', 'required'),
			array('user_id, number_people', 'numerical', 'integerOnly'=>true),
			array('total', 'numerical'),
			array('status', 'length', 'max'=>8),
			array('departure_date, payment_date, note', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, user_id, arrival_date, departure_date, number_people, booked_date, status, total, payment_date, note', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'user' => array(self::BELONGS_TO, 'User', 'user_id'),
			'typeRooms' => array(self::MANY_MANY, 'TypeRoom', 'rooms_booked(reservation_id, type_room_id)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'user_id' => 'User',
			'arrival_date' => 'Arrival Date',
			'departure_date' => 'Departure Date',
			'number_people' => 'Number People',
			'booked_date' => 'Booked Date',
			'status' => 'Status',
			'total' => 'Total',
			'payment_date' => 'Payment Date',
			'note' => 'Note',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('arrival_date',$this->arrival_date,true);
		$criteria->compare('departure_date',$this->departure_date,true);
		$criteria->compare('number_people',$this->number_people);
		$criteria->compare('booked_date',$this->booked_date,true);
		$criteria->compare('status',$this->status,true);
		$criteria->compare('total',$this->total);
		$criteria->compare('payment_date',$this->payment_date,true);
		$criteria->compare('note',$this->note,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Reservation the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
