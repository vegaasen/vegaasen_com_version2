<?php
	$urls = array(
		array('https://wow.telenor.com/groupunits/en/opco/locations/fornebu/foodbeverage/Pages/Lunchmenu.aspx', 'Fornebu')
	);
	$lunchInfo = new LunchScrape($urls, 'nothing');
    echo "Initiated scrape..";
	$lunchInfo->performScrape();
?>


<?php

	/**
	 * Simple screen-scraper for Telenor|Lunch
     *
     *
	 *
	 * @author Vegard Aasen
	 * @version 1.0
	 * @since 13.06.2012
	 */

	class LunchScrape {
		public $urls = array();
		public $refreshInterval;
		private $snowReport = array();
		private $allReports = array();
		private $fileName = "telenorlunch.xml";
		private $userAgent = 'Googlebot/2.1 (http://www.googlebot.com/bot.html)';

		/**
         * @param $urls
         * @param $refreshInterval
         */
		public function LunchScrape($urls, $refreshInterval) {
			$this->urls = $urls;
			$this->refreshInterval = $refreshInterval;
		}

		public function performScrape() {
			if(!empty($this->urls)) {
				foreach ($this->urls as $url) {
					libxml_use_internal_errors( true );
					libxml_clear_errors();
					$ch = curl_init();

					curl_setopt($ch, CURLOPT_USERAGENT, $this->userAgent);
					curl_setopt($ch, CURLOPT_ENCODING, "UTF-8");
					curl_setopt($ch, CURLOPT_URL, $url[0]);
                    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_NTLM);
					curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
					curl_setopt($ch, CURLOPT_AUTOREFERER, true);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
					curl_setopt($ch, CURLOPT_TRANSFERTEXT, true);
					curl_setopt($ch, CURLOPT_TIMEOUT, 300);
                    curl_setopt($ch, CURLOPT_UNRESTRICTED_AUTH, 1);
                    curl_setopt($ch, CURLOPT_USERPWD, "TELENOR\\t769765:Vegard11");

					$curlData = curl_exec($ch);
					$html = new DOMDocument();
					$html->loadHTML($curlData);
                    $html->saveHTMLFile("mordi.html");
					$xpath = new DOMXPath($html);
					$r = "/html/body/comment()[10]";
					$items = $xpath->query($r); $this->addNodeToArray("r", $this->getNodeValue($items, true));
					$this->addNodeToArray("ID", $url[1]);
					$this->allReports[] = $this->snowReport;
				}
				$this->createSnowReportXMLDocument($this->allReports);
				return "Scrape was successfull!";
			}else{
				return "Error: Could not initiate scrape. Missing url?";
			}
		}

		/**
		 *
		 * Pushes the NodeKey and NodeValue into the array SnowReport
		 * Returns false if value/key missing. Otherwise; True.
		 * @param unknown_type $nodeKey
		 * @param unknown_type $nodeValue
         *
         * @return _
		 */
		private function addNodeToArray($nodeKey, $nodeValue) {
			if(!empty($nodeKey)){
				if(!empty($nodeValue)) {
					$this->snowReport[$nodeKey] = $nodeValue;
					return true;
				}
				return false;
			}
			return false;
		}

		/**
         * @param $domItems
         * @param $encoded
         * @return mixed|string
         */
		private function getNodeValue($domItems, $encoded) {
			if(!empty($domItems)) {
				foreach ($domItems as $item) {
					//ye, looks quite stupid. Tho remember; This will always contain _one_ element. Nothing else. (unless its empty ofc..)
					$value = "";
					$value = str_ireplace('<![CDATA[', '', $item->nodeValue);
					$value = str_ireplace(']]>', '', $value);
					if($encoded==true){
						return mb_convert_encoding($value, "ISO-8859-1", "UTF-8");
					}else{
						return $value;
					}
				}
			}
			return "-";
		}

		/**
		 *
		 * Create the XML Document
		 * @param List<String> $resort
		 */
		private function createSnowReportXMLDocument($resorts) {
			echo "**********Starting actual snowreport traversal**********\n";
			$document = new DOMDocument("1.0", "UTF-8");
			$document->formatOutput=true;

			$topElement = $document->createElement("skiresorts");
			$document->appendChild($topElement);

			foreach ($resorts as $resort) {
				$resortElement = $document->createElement("resort");

				$this->addResortElementsOfSnowReport('r', $document, $resortElement, $resort);

				$topElement->appendChild($resortElement);
			}

			$document->save($this->fileName, LIBXML_NOCDATA);
			$this->repairXMLCDATA();
		}

		/**
		 *
		 * Add nice documentelemenets (DOM@XML)
		 *
		 * @param String $key
		 * @param String $document
		 * @param DOMNodeListElement $partElement
		 * @param Object<Resort> $element
         *
         * @return _
		 */
		function addResortElementsOfSnowReport($key, $document, $partElement, $element) {
			if(!empty($key) && !empty($document) && !empty($partElement)) {
				$a = $document->createElement($key);
				$attr = $document->createAttribute("id");
				$attr->nodeValue = $element["ID"];
				$a->appendChild($document->createCDATASection($element[$key]));
				$a->setAttributeNode($attr);
				$partElement->appendChild($a);
				return $partElement;
			}
		}

		private function repairXMLCDATA() {
			$file = $this->fileName;
			$file_c = file_get_contents($file);
			$file_o = fopen($file, "w");
			$file_c = str_ireplace('<![CDATA[ <?xml version="1.0" encoding="UTF-8"?>', '', $file_c);
			$file_c = str_ireplace(']]>', '', $file_c);
			fwrite($file_o, $file_c);
			fclose($file_o);
			$document = new DOMDocument("1.0", "UTF-8");
			$document->load($this->fileName);
			$document->formatOutput = true;
			$document->save($this->fileName);
			echo $document->saveXML();
		}
	}

?>