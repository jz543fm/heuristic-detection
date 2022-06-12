package com.example.demo;


import com.example.demo.model.RemoteDriverConfig;
import org.checkerframework.checker.formatter.FormatUtil;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.util.concurrent.ExecutionException;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) throws Exception {
      //  SpringApplication.run(DemoApplication.class, args);
        RemoteDriverConfig remoteDriverConfig = new RemoteDriverConfig();
     /*   ChromeOptions options = new ChromeOptions ();
        //options.addExtensions(new File("C:\\Users\\HP\\Downloads\\phishing_detector-master\\phishing_detector-master\\Package.crx"));
        options.addExtensions(new File("C:\\Users\\HP\\Downloads\\phishing_detector-master\\phishing_detector-master\\logic\\Extension.crx"));
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        WebDriver webDriver = new ChromeDriver(capabilities);
        webDriver.get("http://www.cityfireprotection.co.uk/our-engineers;defacement;FALSE;0;Apache/2.2;PHP/5.3;\"text/html; charset=utf-8\";Sun");
        webDriver.get("http://www.google.com");
        webDriver.getCurrentUrl();*/
    }



}
