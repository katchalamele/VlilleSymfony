<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class IndexController extends AbstractController{

    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
    * @Route("/", name="index")
    */
    public function index(){
        return $this->redirectToRoute('stations');
    }

    /**
    * @Route("/stations", name="stations")
    */
    public function stations(){
        $stations = $this->get_stations(30);

        return $this->render('stations/index.html.twig', [
            'stations' => $stations,
        ]);
    }

    /**
    * @Route("/station/{recordid}", name="station")
    */
    public function station($recordid){
        return new Response('<h1>Hello '.$recordid.'</h1>');
    }

    private function get_stations($rows){
        $response = $this->client->request(
            'GET',
            'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&timezone=Europe/Paris&rows='.$rows
        );
        //echo($response->getStatusCode());
        return $response->toArray();
    }
}

?>

