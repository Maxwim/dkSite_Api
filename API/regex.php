<?php


// session_start();
class regex{
    /**
    * @param security de $_POST['jeton'];
    */
    protected $csrf;
    private $str;

    private $tab;
    /**
     * @var false|string[]
     */
    private $valid;
    /**
     * @var string[]
     */
    private $search;
    private $replace;

    public function __construct()
        {
            //$_SESSION['ID_Compte'] = 2;
        
            $this->search  = array('&', '"'     , "'"    , '<'   , '>', '/' , '\\', '%', ',', '\'', ')', '(', '{', '[', '}', ']', '$', '£', ';',  '*', '²', '=');
            $this->replace = array('' );
            if(!isset($_SESSION['jeton'])){
                $_SESSION['jeton'] = md5(bin2hex(openssl_random_pseudo_bytes(6)));
            }
        }

    /**
    * @author maxim
    * @param String -> clef CSRF du formulaire
    * @return Boolean
    */
    public function CheckCsrf($jeton){
        $this->csrf = $jeton;
        if($this->csrf == $_SESSION['jeton']){
            $this->valid=true;
            return true;
        }
    }

    /**
    * @author maxim
    * @param String replace 
    * @return String "clean MySQL + XSS"
    */
    public function SecirityString($str)
    {
        $this->str=$str;
        if($this->valid)
        {
            
            $this->str = str_replace($this->search, $this->replace, $this->str); 
            $this->str = htmlspecialchars($this->str);

            //echo '<h1 style="color: green;"">Caractères vérifier<h1>';   
            return $this->str;        
        }else{
            $this->str  ="csrf pas init";
            return $this->str;
        }
    }

    /**
     * @author maxim
     * @param "Set array => SecurityTab()"
     */
    public function SetSecurityTab($tab){
        $this->tab = $tab;
    }
    /**
     * @author maxim
     * @param SetSecurityTab -> array
     * @return Array "clean"
     */
    public function SecurityTab(){
        if($this->valid) {

            $this->extract = implode("#", $this->tab);
            $this->extract = str_replace($this->search, $this->replace, $this->extract);
            $this->extract = htmlspecialchars($this->extract);
            $this->tab = explode('#', $this->extract);
            return $this->tab;
        }
        else{
            $this->tab = array('Erreur csrf pas init');
            return $this->tab;
        }
    }

}